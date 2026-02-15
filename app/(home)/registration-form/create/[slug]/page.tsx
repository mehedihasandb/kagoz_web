"use client";
import { useEffect, useRef, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useGetCustomerHkQuery } from "@/api/memberApi/memberApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberRegistrationSchema } from "@/schemas/formRegistrationSchema";
import {
  useGetMemberDetailsQuery,
  useLazyGetMemberDetailsQuery,
  useLazyGetSingleDistrictQuery,
  useLazyGetSingleDivisionQuery,
  useLazyGetSinglePostalCodeQuery,
  useLazyGetSingleUpazilaQuery,
  useUpdateCustomerMutation,
} from "@/api/customerApi/customerApi";
import { useParams, useRouter } from "next/navigation";
import { Button, DatePicker, Input, Select } from "antd";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import { useDispatch } from "react-redux";
import { updateUserData } from "@/api/slices/authSlice";
import SelectField from "@/components/Forms/SelectField";
import FormEditDatePicker from "@/components/Forms/FormEditDatepicker";
import ImagePdfPreviewModal from "@/components/Modal/imagePdfPreviewModal";
import Link from "next/link";

const MembershipFormEdit = () => {
  const baseApi = process.env.NEXT_PUBLIC_API_BASE_URL;
  const dispatch = useDispatch();
  useRouteGuard("/registration-form/create");
  const params = useParams();
  const userId = params?.slug;
  const router = useRouter();
  const [childrenRows, setChildrenRows] = useState<any>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [permenentHkAddress, setPermanentAddress] = useState<any>({});
  const [presentHkAddress, setPresentAddress] = useState<any>({});
  const [nidCopy, setNidCopy] = useState<string | null>(null);
  const [passportCopy, setPassportCopy] = useState<string | null>(null);
  const [signCopy, setSignCopy] = useState<string | null>(null);
  const [dob, setDob] = useState<any>(null);
  const [serialNo, setSerialNo] = useState<any>(null);
  const [applicationDate, setApplicationDate] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );

  const [modalPdfVisible, setPdfModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<any>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const { data: customerHkData } = useGetCustomerHkQuery({});
  const { data: memberData } = useGetMemberDetailsQuery(userId);
  const [getSingmemberData, { data: membersData }] =
    useLazyGetMemberDetailsQuery();
  const [triggerGetSingleDivisionQuery, { data: divisionData }] =
    useLazyGetSingleDivisionQuery();
  const [triggerGetSingleDistrictQuery, { data: districtData }] =
    useLazyGetSingleDistrictQuery();
  const [getSingleUpazila, { data: upazilaData }] =
    useLazyGetSingleUpazilaQuery();
  const [getSinglePostalCode, { data: postalCodeData }] =
    useLazyGetSinglePostalCodeQuery();
  const country: any = customerHkData?.result?.country;
  const customerBasicData = memberData?.result;
  const existingPhotoPath = memberData?.result?.photo;
  const nidFile = memberData?.result?.nidImage;
  const passportFile = memberData?.result?.passportPhotocopy;
  const signatureFile = memberData?.result?.proposerSignature;
  const addresses = customerBasicData?.addresses || [];
  const relations = customerBasicData?.relations || [];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token);
  }, []);

  const [updateCustomer] = useUpdateCustomerMutation();

  const countryOptions =
    country &&
    country?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const handleViewPdfClick = (url: any) => {
    setPdfModalVisible(true);
    // console.
    setPdfUrl(url);
  };

  const enrichAddress = async (address: any) => {
    const [country, division, district, unionWard] = await Promise.all([
      fetch(
        `${baseApi}/setting/api/v1/hk/division?countryId=${address.countryId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((res) => res.json()),
      fetch(
        `${baseApi}/setting/api/v1/hk/district?divisionId=${address.divisionId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((res) => res.json()),
      fetch(
        `${baseApi}/setting/api/v1/hk/upazila?districtId=${address.districtId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((res) => res.json()),
      fetch(
        `${baseApi}/setting/api/v1/hk/postal-code?upazilaId=${address.upazillaId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then((res) => res.json()),
    ]);

    return {
      ...address,
      divisionOptions:
        country?.result?.map((d: any) => ({ label: d.name, value: d.id })) ||
        [],
      districtOptions:
        division?.result?.map((d: any) => ({ label: d.name, value: d.id })) ||
        [],
      upazilaOptions:
        district?.result?.map((d: any) => ({ label: d.name, value: d.id })) ||
        [],
      postalOptions:
        unionWard?.result?.map((d: any) => ({
          label: d.postalCode,
          value: d.postalCode,
        })) || [],
    };
  };

  useEffect(() => {
    if (!addresses?.length || !accessToken) {
      console.log("No addresses or token");
      return;
    }

    const fetchAndSetAddresses = async () => {
      const addressMap: { [key: number]: (data: any) => void } = {
        1: setPresentAddress,
        6: setPermanentAddress,
      };

      for (const [typeId, setter] of Object.entries(addressMap)) {
        const address = addresses.find(
          (a) => a.addressTypeId === parseInt(typeId)
        );
        if (address) {
          const enriched = await enrichAddress(address);
          setter(enriched);
        }
      }
    };

    fetchAndSetAddresses();
  }, [addresses, accessToken]);

  useEffect(() => {
    if (relations?.length) {
      const children = relations?.filter((addr) => addr.relationTypeId === 13);
      setChildrenRows(
        children.length > 0
          ? children?.map((child) => ({
            id: child.relativeId ?? null,
            relationTypeId: child.relationTypeId ?? null,
            relationName: child.relationName ?? null,
            relationNameBn: child.relationNameBn ?? null,
            dateOfBirth: child.relativeDateOfBirth ?? null,
            occupation: child?.relativeOccupation ?? "",
            nid: child.relativeNid ?? "",
            nidDoc: child.relativeNidDoc ?? "",
            birthRegNo: child.birthRegNo ?? "",
            birthRegDoc: child.birthRegDoc ?? "",
            address: child.relativeAddress ?? "",
            addressBn: child.relativeAddressBn ?? "",
            phone: child.relativePhone ?? "",
            email: child.relativeEmail ?? "",
            countryId: child.relativeCountryId ?? null,
            divisionId: child.relativeDivisionId ?? null,
            districtId: child.relativeDistrictId ?? null,
            upazillaId: child.relativeUpazillaId ?? null,
            postalCode: child.relativePostalCode ?? "",
            isActive: child.relativeIsActive ?? "",
          }))
          : [
            {
              id: null,
              photo: "",
              relationTypeId: 13,
              relationName: "",
              relationNameBn: "",
              dateOfBirth: null,
              occupation: "",
              nid: "",
              nidDoc: "",
              birthRegNo: "",
              birthRegDoc: "",
              address: "",
              addressBn: "",
              countryId: null,
              divisionId: null,
              districtId: null,
              upazillaId: null,
              postalCode: "",
              email: "",
              phone: "",
              isActive: true,
            },
          ]
      );
    }
  }, [relations]);

  useEffect(() => {
    if (customerBasicData) {
      const officialAddress = customerBasicData?.addresses?.find(
        (addr) => addr.addressTypeId === 3
      );
      const residentialAddress = customerBasicData?.addresses?.find(
        (addr) => addr.addressTypeId === 5
      );
      const spouse = customerBasicData?.relations?.find(
        (addr) => addr.relationTypeId === 8
      );
      setDefaultValue({
        customerName: customerBasicData.customerName,
        fatherOrSpouseName: customerBasicData.fatherOrSpouseName,
        presentDesignation: customerBasicData.presentDesignation,
        customerTypeId: customerBasicData.customerTypeId,
        customerTypeName: customerBasicData.customerTypeName,
        nid: customerBasicData.nid,
        nationality: customerBasicData.nationality,
        dateOfBirth: customerBasicData.dateOfBirth,
        emailAddress: customerBasicData.emailAddress,
        phoneNumber: customerBasicData.phoneNumber,
        countryId: customerBasicData?.countryId,
        //passport
        passportNumber: customerBasicData?.passportNumber,
        passportType: customerBasicData?.passportType,
        issuingAuthority: customerBasicData?.issuingAuthority,
        placeOfIssue: customerBasicData?.placeOfIssue,
        placeOfExpiry: customerBasicData?.placeOfExpiry,
        dateOfExpiry: customerBasicData?.dateOfExpiry,
        dateOfIssue: customerBasicData?.dateOfIssue,
        incomeDetails: customerBasicData?.incomeDetails,
        startedPlayingGolfSince: customerBasicData?.startedPlayingGolfSince,
        disabilityDetails: customerBasicData?.disabilityDetails,
        proposerName: customerBasicData?.proposerName,
        proposerMembershipNo: customerBasicData?.proposerMembershipNo,
        otherClubName: customerBasicData?.otherClubName,
        otherClubAddress: customerBasicData?.otherClubAddress,
        otherClubMembershipNo: customerBasicData?.otherClubMembershipNo,

        relatives: [
          {
            id: spouse?.relativeId || null,
            relationTypeId: spouse?.relationTypeId || 8,
            relationName: spouse?.relationName,
            relationNameBn: spouse?.relationNameBn,
            occupation: spouse?.relativeOccupation,
            isActive: spouse?.relativeIsActive ?? true,
          },
        ],

        addresses: [
          {
            id: officialAddress?.addressId || null,
            address: "",
            addressTypeId: officialAddress?.addressTypeId || 3,
            fax: officialAddress?.addressFax || "",
            email: officialAddress?.addressEmail || "",
            phone: officialAddress?.addressPhone || "",
            isDefault: officialAddress?.isDefault || false,
            isActive: officialAddress?.isActive || true,
          },
          {
            id: residentialAddress?.addressId || null,
            address: "",
            addressTypeId: residentialAddress?.addressTypeId || 5,
            fax: residentialAddress?.addressFax || "",
            email: residentialAddress?.addressEmail || "",
            phone: residentialAddress?.addressPhone || "",
            isDefault: residentialAddress?.isDefault || false,
            isActive: residentialAddress?.isActive || true,
          },
        ],
      });
      setDob(
        customerBasicData?.dateOfBirth
          ? dayjs(customerBasicData?.dateOfBirth).format("YYYY-MM-DD")
          : null
      );
      setSerialNo(
        customerBasicData?.serialNo ? customerBasicData?.serialNo : null
      );
      setApplicationDate(
        customerBasicData?.applicationDate
          ? dayjs(customerBasicData?.applicationDate).format("YYYY-MM-DD")
          : null
      );
    }
  }, [customerBasicData]);

  const addChildrenRow = () => {
    setChildrenRows([
      ...childrenRows,
      {
        id: null,
        photo: "",
        relationTypeId: 13,
        relationName: "",
        relationNameBn: "",
        dateOfBirth: null,
        occupation: "",
        nid: "",
        nidDoc: "",
        birthRegNo: "",
        birthRegDoc: "",
        address: "",
        addressBn: "",
        countryId: null,
        divisionId: null,
        districtId: null,
        upazillaId: null,
        postalCode: "",
        email: "",
        phone: "",
        isActive: true,
      },
    ]);
  };

  //address handle
  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setPermanentAddress((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChangeCountry = async (value: any) => {
    const divisionData = await triggerGetSingleDivisionQuery({
      countryId: value,
    }).unwrap();
    const updatedRows = {
      ...permenentHkAddress,
      countryId: value,
      divisionId: null,
      districtId: null,
      upazillaId: null,
      postalCode: "",
      divisionOptions: divisionData?.result?.map((division: any) => ({
        label: division.name,
        value: division.id,
      })),
    };
    setPermanentAddress(updatedRows);
  };
  const handleSelectChangeDivision = async (value: any) => {
    const districtData = await triggerGetSingleDistrictQuery({
      divisionId: value,
    }).unwrap();
    const updatedRows = {
      ...permenentHkAddress,
      divisionId: value,
      districtId: null,
      upazillaId: null,
      postalCode: "",
      districtOptions:
        districtData?.result?.map((district: any) => ({
          label: district.name,
          value: district.id,
        })) || [],
    };
    setPermanentAddress(updatedRows);
  };
  const handleSelectChangeDistrict = async (value: any) => {
    const upzilaData = await getSingleUpazila({ districtId: value }).unwrap();
    const updatedRows = {
      ...permenentHkAddress,
      districtId: value,
      upazillaId: null,
      postalCode: "",
      upazilaOptions:
        upzilaData?.result?.map((upazila: any) => ({
          label: upazila.name,
          value: upazila.id,
        })) || [],
    };
    setPermanentAddress(updatedRows);
  };
  const handleSelectChangeUpazila = async (value: any) => {
    const postalCodeData = await getSinglePostalCode({
      upazilaId: value,
    }).unwrap();
    const updatedRows = {
      ...permenentHkAddress,
      upazillaId: value,
      postalCode: "",
      postalOptions:
        postalCodeData?.result?.map((upazila: any) => ({
          label: upazila.postalCode,
          value: upazila.postalCode,
        })) || [],
    };
    setPermanentAddress(updatedRows);
  };
  //end address handle

  const toggleSelect = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === childrenRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...Array(childrenRows.length).keys()]);
    }
  };

  const deleteSelectedRows = () => {
    const updatedRows = childrenRows.filter(
      (row, index: any) => !selectedRows.includes(index)
    );
    setChildrenRows(updatedRows);
    setSelectedRows([]);
  };

  useEffect(() => {
    if (!photoPreview && existingPhotoPath) {
      setPhotoPreview(`${baseApi}${existingPhotoPath}`);
    }
  }, [existingPhotoPath]);

  const handlePhotoClick = () => {
    photoInputRef.current?.click(); // open file dialog
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setBase64Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleNidCopyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNidCopy(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPassportCopy(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleSignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSignCopy(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDobChange = (value: dayjs.Dayjs | null) => {
    setDob(value ? value.format("YYYY-MM-DD") : null);
  };

  const onSubmit = async (values: any) => {
    values.companyId = 1;
    values.vatRegId = 1;
    values.customerNameBn = values.customerName;
    values.registrationStatus = 1;
    values.currentDesignation = 1;
    values.countryId = 1;
    values.isActive = true;
    values.serialNo = serialNo;
    values.applicationDate = applicationDate;

    if (base64Image) {
      values.photo = base64Image;
    }
    if (nidCopy) {
      values.nidImage = nidCopy;
    }
    if (passportCopy) {
      values.passportPhotocopy = passportCopy;
    }
    if (signCopy) {
      values.proposerSignature = signCopy;
    }
    values.relatives = [
      ...values.relatives,
      ...childrenRows?.map((row: any) => ({
        ...row,
      })),
    ];
    values.addresses = [
      {
        id: permenentHkAddress?.addressId,
        addressTypeId: permenentHkAddress?.addressTypeId || 6,
        address: permenentHkAddress?.address || "",
        fax: permenentHkAddress?.addressFax || "",
        phone: permenentHkAddress?.addressPhone || "",
        email: permenentHkAddress?.addressEmail || "",
        countryId: permenentHkAddress?.countryId,
        divisionId: permenentHkAddress?.divisionId,
        districtId: permenentHkAddress?.districtId,
        upazillaId: permenentHkAddress?.upazillaId,
        postalCode: permenentHkAddress?.postalCode,
        isDefault: false,
        isActive: true,
      },
      ...values.addresses,
    ];

    try {
      const res = await updateCustomer({ id: userId, body: values }).unwrap();
      if (res && res.result && (res.code === 200 || res.code === 201)) {
        toast.success("Successfully Inserted");
        const membersData = await getSingmemberData(res?.result).unwrap();
        const customerData = membersData?.result;
        dispatch(
          updateUserData({
            customerTypeId: customerData.customerTypeId,
            customerTypeName: customerData.customerTypeName,
            phone: values.phoneNumber,
          })
        );
        setTimeout(() => {
          router.push(`/registration-form`);
        }, 500);
      } else {
        toast.error("Failed to insert data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md max-w-full py-4">
      <div className="px-6 py-8 bg-white rounded-md shadow-md max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-6 text-black">
          BOF Golf Club Membership Registration Form
        </h2>

        <div
          className="my-12 md:mt-0 md:ml-8
             flex flex-col items-end gap-4
             text-black text-sm"
        >
          <p className="text-center font-medium">
            Form&nbsp;no:&nbsp;BOF/GOLF/2
          </p>

          <button
            type="button"
            onClick={handlePhotoClick}
            className="w-[200px] h-[200px] px-1 py-1          
               border border-black rounded-sm
               flex items-center justify-center text-center
               relative focus:outline-none focus:ring-2 focus:ring-blue-500
               shrink-0"
          >
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              name="applicantPhoto"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Uploaded passport size"
                className="h-full w-full object-cover rounded-sm"
              />
            ) : (
              <span className="text-[11px] leading-snug select-none">
                Kindly&nbsp;Enclose&nbsp;<strong>02</strong>&nbsp;copies
                <br />
                passport&nbsp;size and&nbsp;<strong>02</strong>&nbsp;copies
                <br />
                stamp&nbsp;size photographs
              </span>
            )}
          </button>

          <div className="flex items-center gap-6 text-[13px]">
            {/* Serial */}
            <div className="flex items-center gap-2">
              <label htmlFor="serial" className="text-sm">
                Serial:
              </label>
              <input
                value={serialNo || ""}
                onChange={(e) => setSerialNo(e.target.value)}
                className="border-b-2 outline-0 w-24"
                placeholder="Enter S.N"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="date" className="text-sm">
                Date:
              </label>
              <input
                id="date"
                type="date"
                className="border-b-2 outline-0"
                value={applicationDate || ""}
                onChange={(e) => setApplicationDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValue}
          resolver={yupResolver(memberRegistrationSchema)}
        >
          <div className="grid grid-cols-1 gap-4 text-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <FormInput
                  style={{ color: "black" }}
                  size="large"
                  name="customerTypeName"
                  label="Type :"
                  disable
                  required
                />
              </div>

              <div className="flex flex-col">
                <FormInput
                  label="Full Name of the Applicant :"
                  id="applicantName"
                  name="customerName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* FATHER'S/HUSBAND'S NAME */}
              <div className="flex flex-col">
                <FormInput
                  label={"Father's/Spouse's Name"}
                  name="fatherOrSpouseName"
                  type="text"
                  placeholder="Enter Father's/Spouse's name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* NATIONALITY */}
              <div className="flex flex-col">
                <FormInput
                  label={"Nationality"}
                  id="nationality"
                  name="nationality"
                  type="text"
                  placeholder="Enter your nationality"
                // required
                />
              </div>
              <div className="flex flex-col">
                <FormInput
                  label={"Phone Number :"}
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your Phone"
                  required
                />
              </div>
              <div className="flex flex-col">
                <FormInput
                  label={"Email :"}
                  name="emailAddress"
                  type="text"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="flex flex-col">
                <FormInput
                  label={"National ID Card No. :"}
                  id="nationalId"
                  name="nid"
                  type="text"
                  placeholder="Enter National ID number"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="photocopyofPassport"
                  className="font-medium text-black"
                >
                  Photocopy att.
                </label>
                <div className="flex gap-2">
                  <Link
                    href={`${baseApi}${nidFile}`}
                    target="_blank"
                    className=" flex items-center pt-2"
                  >
                    <p className="flex items-center justify-center bg-cyan-600 text-center w-20 h-10 text-white p-1 rounded-lg">
                      View File
                    </p>
                  </Link>
                  <input
                    name="custNidPhotocopy"
                    type="file"
                    className="border px-3 py-2 mt-1 rounded-md w-full"
                    onChange={handleNidCopyChange}
                  />
                </div>
              </div>
              {/* </div> */}

              {/* DATE OF BIRTH */}
              <div className="flex flex-col">
                <FormEditDatePicker
                  name="dateOfBirth"
                  label="Date of Birth :"
                  size="large"
                  onChange={handleDobChange}
                  format="YYYY-MM-DD"
                  required
                />
              </div>
              <div className="flex flex-col">
                <FormInput
                  label={"Present Designation"}
                  name="presentDesignation"
                  type="text"
                  placeholder="Enter your designation"
                // required
                />
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-black mb-4">
                    Official Address
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Fax No.</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.0.fax"
                              type="text"
                              placeholder="Enter Fax No."
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Tel No.</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.0.phone"
                              type="text"
                              placeholder="Enter Tel No."
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Email</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.0.email"
                              placeholder="Enter Email"
                            // required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Residential Address */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-black mb-4">
                    Residential Address
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Mobile No.</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.1.fax"
                              type="text"
                              placeholder="Enter Mobile No."
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Tel No.</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.1.phone"
                              type="text"
                              placeholder="Enter Tel No."
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Email</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="addresses.1.email"
                              placeholder="Enter Email"
                            // required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                {/* PERMANENT ADDRESS */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-black mb-4">
                    Permanent Address
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Vill/Holding No.</td>
                          <td className="px-4 py-2 border">
                            <Input
                              className="border px-2 py-1 rounded w-full"
                              style={{ width: "100%" }}
                              value={permenentHkAddress?.address}
                              onChange={handleAddressChange}
                              name="address"
                              type="text"
                              placeholder="Enter Village/Holding No."
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Country</td>
                          <td className="px-4 py-2 border">
                            <Select
                              style={{
                                width: "100%",
                              }}
                              showSearch
                              placeholder="Select Country..."
                              optionFilterProp="childrenaddress"
                              onChange={(value) => {
                                handleSelectChangeCountry(value);
                              }}
                              // onSearch={onSearch}
                              options={countryOptions}
                              value={permenentHkAddress?.countryId}
                            // filterOption={filterOption}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Division</td>
                          <td className="px-4 py-2 border">
                            <Select
                              style={{
                                width: "100%",
                              }}
                              showSearch
                              placeholder="Select division..."
                              optionFilterProp="childrenaddress"
                              onChange={(value) =>
                                handleSelectChangeDivision(value)
                              }
                              // onSearch={onSearch}
                              options={permenentHkAddress?.divisionOptions}
                              value={permenentHkAddress?.divisionId}
                            // filterOption={filterOption}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">District</td>
                          <td className="px-4 py-2 border">
                            <Select
                              style={{
                                width: "100%",
                              }}
                              showSearch
                              placeholder="Select district..."
                              optionFilterProp="childrenaddress"
                              onChange={(value) =>
                                handleSelectChangeDistrict(value)
                              }
                              // onSearch={onSearch}
                              options={permenentHkAddress?.districtOptions}
                              value={permenentHkAddress?.districtId}
                            // filterOption={filterOption}
                            />
                          </td>
                        </tr>
                        {/* <tr>
                          <td className="px-4 py-2 border">P.S.</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              id="permanentPS"
                              name="permanentPS"
                              type="text"
                              placeholder="Enter Police Station"
                              // required
                            />
                          </td>
                        </tr> */}
                        <tr>
                          <td className="px-4 py-2 border">Upazilla</td>
                          <td className="px-4 py-2 border">
                            <Select
                              style={{
                                width: "100%",
                              }}
                              showSearch
                              placeholder="Select Upazila..."
                              optionFilterProp="childrenaddress"
                              onChange={(value) =>
                                handleSelectChangeUpazila(value)
                              }
                              // onSearch={onSearch}
                              options={permenentHkAddress?.upazilaOptions}
                              value={permenentHkAddress?.upazillaId}
                            // filterOption={filterOption}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">P. O.</td>
                          <td className="px-4 py-2 border">
                            <Select
                              style={{
                                width: "100%",
                              }}
                              showSearch
                              placeholder="Select postal code..."
                              optionFilterProp="childrenaddress"
                              onChange={(e) => {
                                const updatedRows = {
                                  ...permenentHkAddress,
                                  postalCode: e,
                                };
                                setPermanentAddress(updatedRows);
                              }}
                              // onSearch={onSearch}
                              options={permenentHkAddress?.postalOptions}
                              value={permenentHkAddress?.postalCode}
                            // filterOption={filterOption}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Fax No.</td>
                          <td className="px-4 py-2 border">
                            {/* <FormInput
                              style={{ width: "100%" }}
                              id="permanentFaxNo"
                              name="permanentFaxNo"
                              type="text"
                              placeholder="Enter Fax No."
                            /> */}
                            <Input
                              className="border px-2 py-1 rounded w-full"
                              style={{ width: "100%" }}
                              value={permenentHkAddress?.addressFax}
                              onChange={handleAddressChange}
                              name="addressFax"
                              type="text"
                              placeholder="Enter Fax No."
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Tel No.</td>
                          <td className="px-4 py-2 border">
                            {/* <FormInput
                              style={{ width: "100%" }}
                              id="permanentTelNo"
                              name="permanentTelNo"
                              type="text"
                              placeholder="Enter Telephone No."
                            /> */}
                            <Input
                              className="border px-2 py-1 rounded w-full"
                              style={{ width: "100%" }}
                              value={permenentHkAddress?.addressPhone}
                              onChange={handleAddressChange}
                              name="addressPhone"
                              type="text"
                              placeholder="Enter Phone No."
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Email</td>
                          <td className="px-4 py-2 border">
                            {/* <FormInput
                              style={{ width: "100%" }}
                              id="permanentEmail"
                              name="permanentEmail"
                              placeholder="Enter Email"
                            /> */}
                            <Input
                              className="border px-2 py-1 rounded w-full"
                              style={{ width: "100%" }}
                              value={permenentHkAddress?.addressEmail}
                              onChange={handleAddressChange}
                              name="addressEmail"
                              type="text"
                              placeholder="Enter email No."
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* PASSPORT DETAILS / Description of Passport */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-black mb-4">
                    Description of Passport
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700 border-collapse">
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">Passport Number</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="passportNumber"
                              type="text"
                              placeholder="Enter Passport Number"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Passport Type</td>
                          <td className="px-4 py-2 border">
                            <SelectField
                              name="passportType"
                              options={[{ label: "Regular", value: "Regular" }]}
                              placeholder="Select Passport Type"
                              style={{ width: "100%" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">
                            Issuing Authority
                          </td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="issuingAuthority"
                              type="text"
                              placeholder="Enter Issuing Authority"
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Place of Issue</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="placeOfIssue"
                              type="text"
                              placeholder="Enter Place of Issue"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Date of Issue</td>
                          <td className="px-4 py-2 border">
                            <FormEditDatePicker
                              size="large"
                              name="dateOfIssue"
                              format="YYYY-MM-DD"
                              placeholder="Enter Issue Date"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Place of Expiry</td>
                          <td className="px-4 py-2 border">
                            <FormInput
                              style={{ width: "100%" }}
                              name="placeOfExpiry"
                              type="text"
                              placeholder="Enter Place of Expiry"
                            // required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">Date of Expiry</td>
                          <td className="px-4 py-2 border">
                            <FormEditDatePicker
                              name="dateOfExpiry"
                              size="large"
                              format="YYYY-MM-DD"
                              placeholder="Enter Issue Date"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">
                            Photocopy of Passport
                          </td>
                          <td className="px-4 py-2 border flex gap-2">
                            <Link
                              href={`${baseApi}${passportFile}`}
                              target="_blank"
                              className="flex items-center pt-2"
                            >
                              <p className="flex items-center justify-center bg-cyan-600 text-center w-20 h-9 text-white p-1 rounded-lg">
                                View File
                              </p>
                            </Link>
                            <input
                              name="passportPhotocopy"
                              type="file"
                              className="border px-3 py-2 mt-1 rounded-md w-full"
                              onChange={handlePassportChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col">
                  <FormInput
                    name="incomeDetails"
                    type="text"
                    label="Details of Income and Income Tax"
                    placeholder="Enter income and tax details"
                  // required
                  />
                </div>

                <div className="flex flex-col">
                  <FormInput
                    name="startedPlayingGolfSince"
                    type="text"
                    label="Since When You Started Playing Golf"
                    placeholder="Enter when you started playing golf"
                  // required
                  />
                </div>

                {/* Disability */}
                <div className="flex flex-col">
                  <FormInput
                    label="Disability (if any)"
                    name="disabilityDetails"
                    type="text"
                    placeholder="Enter your Disability"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                {/* DESCRIPTION OF FAMILY */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-medium text-xl text-black mb-4">
                    Description of Family
                  </h3>

                  {/* Spouse Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <FormInput
                        label="Name of Spouse"
                        name="relatives.0.relationName"
                        type="text"
                        placeholder="Enter spouse's name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <FormInput
                        label="Occupation of Spouse"
                        name="relatives.0.occupation"
                        type="text"
                        placeholder="Enter spouse's occupation"
                      />
                    </div>
                  </div>

                  {/* Children Information Table */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <p className="text-lg font-medium mb-4">
                      Children Information
                    </p>

                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 bg-gray-100">
                          <tr>
                            <th scope="col" className="px-4 py-3 w-12">
                              <input
                                type="checkbox"
                                checked={
                                  selectedRows.length === childrenRows.length
                                }
                                onChange={toggleSelectAll}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                              />
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Date of Birth
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Occupation
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {childrenRows?.map((row: any, index) => (
                            <tr className="bg-white border-b" key={index}>
                              <td className="px-4 py-3">
                                <input
                                  type="checkbox"
                                  checked={selectedRows.includes(index)}
                                  onChange={() => toggleSelect(index)}
                                  className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  name="relName"
                                  className="border px-2 py-1 rounded w-28 md:w-full"
                                  value={row?.relationName}
                                  placeholder="Enter name"
                                  onChange={(e) => {
                                    const updatedRows = [...childrenRows];
                                    updatedRows[index].relationName =
                                      e.target.value;
                                    setChildrenRows(updatedRows);
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <DatePicker
                                  type="date"
                                  name="dateOfBirth"
                                  value={
                                    row?.dateOfBirth
                                      ? dayjs(row.dateOfBirth)
                                      : null
                                  }
                                  onChange={(date) => {
                                    const updatedRows = [...childrenRows];
                                    updatedRows[index].dateOfBirth = date
                                      ? date.format("YYYY-MM-DD HH:mm:ss")
                                      : null;
                                    setChildrenRows(updatedRows);
                                  }}
                                  className="border px-2 py-1 rounded w-28 md:w-full"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  name="occupation"
                                  value={row?.occupation}
                                  onChange={(e) => {
                                    const updatedRows = [...childrenRows];
                                    updatedRows[index].occupation =
                                      e.target.value;
                                    setChildrenRows(updatedRows);
                                  }}
                                  className="border px-2 py-1 rounded w-24 md:w-full"
                                  placeholder="Enter occupation"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Add/Remove buttons */}
                    <div className="flex justify-start gap-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#02BBDB] text-white rounded-md flex items-center gap-2"
                        onClick={() => addChildrenRow()}
                      >
                        <GoPlusCircle />
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2"
                        onClick={deleteSelectedRows}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
            {/* PROPOSED BY SECTION - Now takes half width on desktop */}
            <div className="flex flex-col">
              <h3 className="font-medium text-xl text-black mb-4">
                Proposed By &#10088;any permanent member&#10089;
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 border-collapse">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">Name</td>
                      <td className="px-4 py-2 border">
                        <FormInput
                          name="proposerName"
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Enter Proposer's Full Name"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">Membership No.</td>
                      <td className="px-4 py-2 border">
                        <FormInput
                          name="proposerMembershipNo"
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Enter Membership Number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">Signature</td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`${baseApi}${signatureFile}`}
                            target="_blank"
                            className="flex items-center pt-2"
                          >
                            <p className="flex items-center justify-center bg-cyan-600 text-center w-20 h-9 text-white p-1 rounded-lg">
                              View File
                            </p>
                          </Link>
                          <input
                            id="proposerSignature"
                            name="proposerSignature"
                            type="file"
                            className="border px-3 py-2 mt-1 rounded-md w-full"
                            onChange={handleSignChange}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-medium text-xl text-black mb-4">
                Membership Details of Other Golf Club &#10088;if any&#10089;
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 border-collapse">
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">Club Name</td>
                      <td className="px-4 py-2 border">
                        <FormInput
                          id="golfClubName"
                          name="otherClubName"
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Enter Golf Club Name"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">Club Address</td>
                      <td className="px-4 py-2 border">
                        <FormInput
                          id="golfClubAddress"
                          name="otherClubAddress"
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Enter Club Address"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">Membership Number</td>
                      <td className="px-4 py-2 border">
                        <FormInput
                          id="otherClubMembershipNo"
                          name="otherClubMembershipNo"
                          type="text"
                          style={{ width: "100%" }}
                          placeholder="Enter Membership Number"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <table className="w-full text-sm text-left text-gray-700 border-collapse">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">DGFI Form</td>
                    <td className="px-4 py-2 border">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`${baseApi}${signatureFile}`}
                          target="_blank"
                          className="flex items-center pt-2"
                        >
                          <p className="flex items-center justify-center bg-cyan-600 text-center w-20 h-9 text-white p-1 rounded-lg">
                            View File
                          </p>
                        </Link>
                        <input
                          id="proposerSignature"
                          name="proposerSignature"
                          type="file"
                          className="border px-3 py-2 mt-1 rounded-md w-full"
                          onChange={handleSignChange}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">IT Return</td>
                    <td className="px-4 py-2 border">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`${baseApi}${signatureFile}`}
                          target="_blank"
                          className="flex items-center pt-2"
                        >
                          <p className="flex items-center justify-center bg-cyan-600 text-center w-20 h-9 text-white p-1 rounded-lg">
                            View File
                          </p>
                        </Link>
                        <input
                          id="proposerSignature"
                          name="proposerSignature"
                          type="file"
                          className="border px-3 py-2 mt-1 rounded-md w-full"
                          onChange={handleSignChange}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
            >
              Submit
            </button>
          </div>
        </Form>

        <ImagePdfPreviewModal
          isModal={modalPdfVisible}
          setIsModal={setPdfModalVisible}
          getPdfFile={pdfUrl}
        />
      </div>
    </div>
  );
};

export default MembershipFormEdit;

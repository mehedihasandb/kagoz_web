"use client";
import { useGetMemberDetailsQuery } from "@/api/customerApi/customerApi";
import { Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useRouteGuard } from "@/hooks/useRouteGuard";
export default function MemberIndex() {
  const { isAuthentication, user } = useSelector((state: any) => state.user);
  const userId = user?.id;
  const userType = user?.customerTypeName;
  useRouteGuard("/registration-form");
  const { data: memberData, isLoading } = useGetMemberDetailsQuery(userId, {
    skip: !userId,
  });
  const customerBasicData = memberData?.result;

  const columns: any = [
    {
      title: "Name",
      dataIndex: "customerName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "lastStatusName",
      key: "lastStatusName",
      render: (_, record: any) => (
        <span
          className={`p-1 px-2 rounded-md ${
            record?.lastStatusId === 1
              ? "bg-yellow-300 "
              : record?.lastStatusId === 2
              ? "bg-green-600"
              : record?.lastStatusId === 3
              ? "bg-red-600 text-white"
              : ""
          }`}
        >
          {record?.lastStatusName}
        </span>
      ),
    },
    {
      title: "action",
      dataIndex: "id",
      align: "center",
      fixed: "right",
      render: (record: any) => (
        <div>
          <Link href={`/registration-form/create/${record}`}>
            <EditOutlined
              style={{ color: "#fff" }}
              className="bg-green-600 rounded-sm text-lg p-1.5"
            />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="bg-white rounded-md shadow-md max-w-full py-4">
      <div className="px-6 py-8 bg-gray-100 rounded-md shadow-md max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-semibold mb-6 text-black">
          BOF Golf Club Membership Registration Form
        </h2>
        {userType !== "Pre-Member" && userType !== "Member" && (
          <div className="flex justify-between items-center mb-6">
            <Link href={`/registration-form/create`}>
              <button className="bg-green-700 border-none p-2 shadow-xl rounded-md cursor-pointer hover:bg-green-600">
                Apply for Member
              </button>
            </Link>
          </div>
        )}
        <div
          className="my-12 md:mt-0
           flex flex-col items-end gap-4
           text-black text-sm w-full"
        >
          <div className="w-full">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={
                (userType === "Pre-Member" || userType === "Member") &&
                customerBasicData
                  ? [customerBasicData]
                  : []
              }
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

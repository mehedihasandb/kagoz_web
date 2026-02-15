import { Button } from "antd";
import Link from "next/link"
interface Props {
    children: React.ReactNode,
    className?: string;
    link?:string;
    onClick?:()=> void;
}

const ShopButton = ({ children, className, link, onClick }: Props) => {
    return (

        <Link href={`${link}`} className="text-white">
            <button className={`${className}`} onClick={onClick}>
                {children}
            </button>
        </Link>

    );
};

export default ShopButton;

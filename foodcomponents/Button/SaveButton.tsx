import { Button } from "antd";
import Link from "next/link"
interface Props {
    children: React.ReactNode,
    className?: string;
    link?:string;
    onClick?:()=> void;
}

const SaveButton = ({ children, className, link, onClick }: Props) => {
    return (
            <button className={`text-white ${className}`} onClick={onClick}>
                {children}
            </button>
      

    );
};

export default SaveButton;
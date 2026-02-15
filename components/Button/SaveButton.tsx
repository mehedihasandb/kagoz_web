
interface Props {
    children: React.ReactNode,
    className?: string;
    link?:string;
    onClick?:()=> void;
}

const SaveButton = ({ children, className, onClick }: Props) => {
    return (
            <button className={`text-white ${className}`} onClick={onClick}>
                {children}
            </button>
      

    );
};

export default SaveButton;
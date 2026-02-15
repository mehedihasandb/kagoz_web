interface Props {
    children: React.ReactNode,
    className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`${className} sm:max-w-custom md:max-w-lg-custom lg:max-w-lg-custom mx-auto sm:px-4`}>
        {children}
    </div>
  );
};

export default Container;
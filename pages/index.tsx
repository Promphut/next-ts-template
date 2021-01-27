import { useRouter } from "next/router";

const Index = (props) => {
    const router = useRouter();
    return <div title="หน้าแรก" menuKey="1"></div>;
};

export default Index;

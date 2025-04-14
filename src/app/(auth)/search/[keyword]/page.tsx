import Content from "@/components/Content/Content";
import { use } from "react";

interface SectionPageParams {
    id: string;
}

export default function Search({ params }: { params: SectionPageParams }) {
    // No error =))
    const unwrappedParams = use(params);
    const keyword = unwrappedParams.keyword;

    // No error =))

    return <Content keyword={keyword} />;
}

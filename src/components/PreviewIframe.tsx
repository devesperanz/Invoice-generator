import parse from "html-react-parser";

const PreviewIframe = ({ htmlContent }: any) => {
  return <div>{parse(htmlContent)}</div>;
};

export default PreviewIframe;

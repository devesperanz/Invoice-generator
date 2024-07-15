// import { POST } from "@/app/api/templates/route";
import { useEffect, useState } from "react";

// Variables
export const TEMPLATES_API = `${process.env.NEXT_PUBLIC_URL}/api/templates`;

// Type for the template data
export type TemplateType = {
  Id: string;
  Name: string;
  Version: string;
  Content: string;
};

// Type for the fetched data structure
export type TemplatesResponseType = {
  Payload: TemplateType[];
  Metadata: {
    Timestamp: string;
    CorrelationId: string;
    ProcessedBy: string;
  };
};

const useTemplates = () => {
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState<boolean>(false);

  /**
   * Fetches all the templates asynchronously.
   *
   * @return {Promise<void>} Promise that resolves when the templates are fetched.
   */
  const fetchTemplates = async () => {
    setTemplatesLoading(true);

    try {
      const response = await fetch(`${TEMPLATES_API}`);
      const data: TemplatesResponseType = await response.json();

      setTemplates(data.Payload);
    } catch (err) {
      console.log(err);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const saveTemplate = async () => {
    setTemplatesLoading(true);

    try {
      const response = await fetch(`${TEMPLATES_API}`, {
        method: "POST",
        body: JSON.stringify({ name: "hope" }),
      });
      const data: TemplatesResponseType = await response.json();
    } catch (err) {
      console.log(err);
    } finally {
      setTemplatesLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return { templates, templatesLoading, saveTemplate };
};

export default useTemplates;

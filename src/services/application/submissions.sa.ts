import * as bdl from "../businessDelegate/submission.bdl";

export const getSubmissionsByFormId = async (formId: string) => {
  try {
    const submissions = await bdl.getSubmissionsByFormId(formId);
    return submissions;
  } catch (error) {
    return [];
  }
};
import { Chat } from "@/lib/genkit";
import { z } from "genkit";

export const GenerateModuleTasksInputSchema = z.object({
  moduleContent: z
    .string()
    .describe(
      "The text content of the syllabus module to generate tasks and applications for."
    ),
  moduleTitle: z.string().describe("The title of the syllabus module."),
});
export type GenerateModuleTasksInput = z.infer<
  typeof GenerateModuleTasksInputSchema
>;

export const GenerateModuleTasksOutputSchema = z.object({
  introductoryMessage: z
    .string()
    .describe(
      "A welcoming, introductory message that includes a brief overview of what the user can expect, including learning tasks and real-world applications."
    ),
  suggestions: z
    .array(z.string())
    .describe(
      "A list of 3-4 short, engaging follow-up questions a student might ask based on the module content."
    ),
});
export type GenerateModuleTasksOutput = z.infer<
  typeof GenerateModuleTasksOutputSchema
>;

const generateModuleTasksPrompt = Chat.definePrompt({
  name: "generateModuleTasksPrompt",
  input: { schema: GenerateModuleTasksInputSchema },
  output: { schema: GenerateModuleTasksOutputSchema },
  prompt: `You are an expert curriculum assistant. Your task is to generate a welcoming, introductory message for a student about a specific syllabus module. This message should also include 2-4 distinct learning tasks and 2-3 real-world applications based on the provided content.

In addition, you must generate a list of 3-4 short, engaging follow-up questions that a student might ask after reading the introduction. These questions should be directly related to the key concepts in the module.

Syllabus Module Content:
"{{{moduleContent}}}"

Module Title: "{{{moduleTitle}}}"

Guidelines:
1. Start the introductory message with a friendly greeting.
2. In the message, create a section with 2 to 4 distinct learning tasks. Use markdown lists.
3. In the message, create a section describing 2 to 3 real-world applications of the module's concepts. Use markdown lists.
4. Combine all of this into a single, cohesive introductory message string.
5. Generate a separate list of 3-4 short, distinct follow-up questions a user might have. These should be concise and designed to encourage exploration of the module's topics.`,
});

const generateModuleTasksFlow = Chat.defineFlow(
  {
    name: "generateModuleTasks",
    inputSchema: GenerateModuleTasksInputSchema,
    outputSchema: GenerateModuleTasksOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await generateModuleTasksPrompt(input);
      if (!output) {
        throw new Error("AI did not return any output.");
      }
      return output;
    } catch (e) {
      console.error("Error generating tasks:", e);
      return {
        introductoryMessage:
          "Hello! I had a little trouble generating the introduction. Please paste the syllabus content again or ask me a question to get started!",
        suggestions: [
          `What are the key topics in "${input.moduleTitle}"?`,
          "Can you give me an overview?",
          "What are the real-world applications?",
        ],
      };
    }
  }
);

export async function generateModuleTasks(
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> {
  return generateModuleTasksFlow(input);
}

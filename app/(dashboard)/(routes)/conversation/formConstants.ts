import * as z from 'zod';

export const formSchema = z.object({
  input: z.string().min(1, 'This field is required :('),
});

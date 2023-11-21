'use client';
import Heading from '@/components/Heading';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema } from './formConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function Conversation() {
  const { control, handleSubmit, formState, ...form } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  const isLoading = formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div>
          <Heading
            description="Talk with our AI :)"
            icon={MessageSquare}
            title="Conversation"
            bgColor={'bg-violet-500/10'}
            iconColor="text-violet-500"
          />
        </div>
      </div>
      <div className="px-4 lg:px-8">
        <Form
          {...form}
          control={control}
          handleSubmit={() => handleSubmit(onSubmit)}
          formState={formState}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              name="input"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormControl className="m-0 p-0">
                    <Input value={value} onChange={onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}

'use client';
import { useState } from 'react';
import Heading from '@/components/Heading';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema } from './formConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';
import axios from 'axios';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/UserAvatar';
import { AssistantAvatar } from '@/components/AssistantAvatar';

export default function Conversation() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>(
    []
  );
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
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: 'user',
        content: values.input,
      };

      const newMessages: ChatCompletionUserMessageParam[] = [
        ...messages,
        userMessage,
      ];

      const res = await axios.post('api/conversation', {
        messages: newMessages,
      });

      setMessages([...newMessages, res.data]);

      form.reset();
    } catch (error) {
      //TODO: Go to Pro modal
      console.log(error);
    } finally {
      router.refresh();
    }
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg w-full border p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="input"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                      disabled={isLoading}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Ask a question."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="col-span-12 lg:col-span-2">
              Ask
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && <Loader />}
        {messages.length === 0 && !isLoading && (
          <Empty label="No conversation started yet." />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map(message => (
            <div
              key={message.content?.toString()}
              className={cn(
                'p-8 w-full flex items-start gap-x-8 rounded-lg',
                message.role === 'user'
                  ? 'bg-white border border-black/10'
                  : 'bg-muted'
              )}
            >
              {message.role === 'user' ? <UserAvatar /> : <AssistantAvatar />}
              <p className="text-sm">{message.content?.toString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

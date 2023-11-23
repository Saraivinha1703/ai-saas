'use client';
import { useState } from 'react';
import Heading from '@/components/Heading';
import { MusicIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema } from './formConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';

export default function Music() {
  const router = useRouter();
  const [music, setMusic] = useState<string | null>(null);
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
      setMusic(null);

      const res = await axios.post('api/music', values);
      setMusic(res.data.audio);
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
            description="Ask for a piece of music from our AI :)"
            icon={MusicIcon}
            title="Music Generation"
            bgColor={'bg-emerald-500/10'}
            iconColor="text-emerald-500"
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
                      placeholder="Ask for any music element."
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
        {music === null && !isLoading && (
          <Empty label="No music generated yet." />
        )}
        {music && (
          <div className="px-2 md:px-4 lg:px-8">
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          </div>
        )}
      </div>
    </>
  );
}

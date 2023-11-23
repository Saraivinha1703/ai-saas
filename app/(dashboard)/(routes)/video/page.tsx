'use client';
import { useState } from 'react';
import Heading from '@/components/Heading';
import { MusicIcon, VideoIcon } from 'lucide-react';
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

export default function Video() {
  const router = useRouter();
  const [video, setVideo] = useState<string | null>(null);
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
      setVideo(null);

      const res = await axios.post('api/video', values);
      setVideo(res.data[0]);

      form.reset();
    } catch (error) {
      //TODO: Go to Pro modal
      console.log(error);
    } finally {
      //router.refresh();
    }
  };

  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div>
          <Heading
            description="Ask for a video from our AI :)"
            icon={VideoIcon}
            title="Video Generation"
            bgColor={'bg-orange-700/10'}
            iconColor="text-orange-700"
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
                      placeholder="Ask for a video."
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
        {video === null && !isLoading && (
          <Empty label="No video generated yet." />
        )}
        {video && (
          <div className="px-2 md:px-4 lg:px-8">
            <video
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls
            >
              <source src={video} />
            </video>
          </div>
        )}
      </div>
    </>
  );
}

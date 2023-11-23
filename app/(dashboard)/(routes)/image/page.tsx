'use client';
import { useState } from 'react';
import Heading from '@/components/Heading';
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { amountOptions, formSchema, resolutionOptions } from './formConstants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import NextImage from 'next/image';
export default function Image() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const { control, handleSubmit, formState, ...form } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const res = await axios.post('api/image', values);
      const urls = res.data.map((image: { url: string }) => image.url);
      setImages(urls);

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
            description="Turn your request into a image :)"
            icon={ImageIcon}
            title="Image Generation"
            bgColor={'bg-pink-700/10'}
            iconColor="text-pink-700"
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
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="m-0 p-0">
                    <Input
                      autoComplete="off"
                      value={value}
                      onChange={onChange}
                      disabled={isLoading}
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="Describe your image."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={onChange}
                    defaultValue={value}
                    value={value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map(option => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="resolution"
              render={({ field: { onChange, value } }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={onChange}
                    defaultValue={value}
                    value={value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map(option => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
        {images.length === 0 && !isLoading && (
          <Empty label="No images loaded yet." />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map(src => (
            <Card key={src} className="rounded-lg overflow-hidden p-2">
              <div className="p-2 relative aspect-square">
                <NextImage
                  fill
                  src={src}
                  alt="Image"
                  priority
                  sizes="(max-width: 768px)"
                />
              </div>
              <CardFooter className="p-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(src)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  <p>Download</p>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

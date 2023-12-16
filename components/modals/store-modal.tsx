import React, { useState } from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { UseStoreModal } from '@/hooks/use-store-modal';
import Modal from '../ui/modal';

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from '@/components/ui/form';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Este campo é obrigatório')
});

export default function StoreModal() {

  const storeModal = UseStoreModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/store', values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error('Algo deu errado.');
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Crie sua loja'
      description='Informe abaixo o nome da sua loja'
      onClose={storeModal.onClose}
      isOpen={storeModal.isOpen}
    >
      <div>
        <div className='space-x-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-[#202020]' >Nome</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder='E-Commerce' {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button 
                  variant={'outline'}
                  onClick={storeModal.onClose}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button 
                  type='submit'
                  disabled={isLoading}
                >Continuar</Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createLoad } from "@/lib/api";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { NewLoadData } from '@/lib/datastore/types';
import { useEffect } from 'react';
import Image from 'next/image';
import {
  Fingerprint,
  Truck,
  User,
  BadgeInfo,
  Building,
  Save,
  Eraser,
  Trash2,
} from 'lucide-react';


const formSchema = z.object({
  id: z.string().min(1, 'Load ID is required.'),
  matricula: z.string().min(1, 'Matricula is required.'),
  nombre: z.string().min(1, 'Nombre is required.'),
  dni: z.string().min(1, 'DNI is required.'),
  carrierName: z.string().min(1, 'Carrier Name is required.'),
});

type LoadFormProps = {
  initialData: NewLoadData | null;
  onSave: (data: NewLoadData) => void;
  onDelete: () => void;
};

export function LoadForm({ initialData, onSave, onDelete }: LoadFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      matricula: '',
      nombre: '',
      dni: '',
      carrierName: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({
        id: '',
        matricula: '',
        nombre: '',
        dni: '',
        carrierName: '',
      });
    }
  }, [initialData, form]);

  const handleClear = () => {
    form.reset({
      id: '',
      matricula: '',
      nombre: '',
      dni: '',
      carrierName: '',
    });
  };

  const handleDelete = () => {
    onDelete();
    handleClear();
  };
  console.log("LOADFORM FILE:", "src/Front/...");
const handleSave = async (values: z.infer<typeof formSchema>) => {
  // 1) Guardar en backend (SQLite)
  const saved = await createLoad({
    load_id: values.id,
    matricula: values.matricula,
    nombre: values.nombre,
    dni: values.dni,
    carrier_name: values.carrierName,
  });

  // 2) Mantener tu flujo actual (UI / last saved)
  onSave({
    id: values.id,
    matricula: values.matricula,
    nombre: values.nombre,
    dni: values.dni,
    carrierName: values.carrierName,
  } as NewLoadData);

  // 3) opcional: log
  console.log("Saved in API:", saved);
};

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Load Data Manager</CardTitle>
            <CardDescription>Enter the details for the load.</CardDescription>
          </div>
          <Image src="/Logo-Europastry-2.png" alt="Europastry Logo" width={120} height={30} className="object-contain" />
        </div>
      </CardHeader>
      <Form {...form}>
       <form onSubmit={form.handleSubmit(handleSave)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Fingerprint /> LOAD ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., LD-12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><Truck /> MATRICULA</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234-ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><User /> NOMBRE</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><BadgeInfo /> DNI</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 12345678X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carrierName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="flex items-center gap-2"><Building /> CARRIER NAME</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Global Transport Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            <div>
              <Button type="button" variant="outline" onClick={handleDelete} className="mr-2">
                <Trash2 /> Delete Data
              </Button>
              <Button type="button" variant="secondary" onClick={handleClear}>
                <Eraser /> Clear Form
              </Button>
            </div>
            <Button type="submit">
              <Save /> Save Load
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

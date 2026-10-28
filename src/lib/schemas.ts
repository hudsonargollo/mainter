import { z } from 'zod';

// Salesman schema
export const salesmanSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')).default(''),
  phone: z.string().optional().default(''),
  commissionRate: z.number().min(0).max(100).default(0),
  active: z.boolean().default(true),
});
export type Salesman = z.infer<typeof salesmanSchema>;

export const customerSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(2),
  company: z.string().optional().default(''),
  nitCi: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  whatsapp: z.string().optional().default(''),
  email: z.string().email().optional().or(z.literal('')).default(''),
  address: z.string().optional().default(''),
  department: z.string().optional().default(''),
  municipality: z.string().optional().default(''),
  customerType: z.enum(['producer', 'distributor', 'company', 'individual']).default('individual'),
  status: z.enum(['lead', 'active', 'inactive']).default('lead'),
  businessLines: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  hectares: z.number().default(0),
  crops: z.array(z.string()).default([]),
  machinery: z.array(z.string()).default([]),
  salesmanId: z.string().optional().default(''),
  preferences: z.object({
    contactChannel: z.string().default(''),
    preferredBrands: z.array(z.string()).default([]),
    buyingSeason: z.string().default(''),
  }).default({ contactChannel: '', preferredBrands: [], buyingSeason: '' }),
  customValues: z.record(z.string(), z.unknown()).default({}),
});

export type Customer = z.infer<typeof customerSchema>;

export const interactionSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  type: z.enum(['visit', 'call', 'purchase', 'quote', 'event']),
  date: z.string(),
  notes: z.string().default(''),
  amount: z.number().optional().default(0),
});
export type Interaction = z.infer<typeof interactionSchema>;

export const followUpSchema = z.object({
  id: z.string().optional(),
  customerId: z.string(),
  dueDate: z.string(),
  note: z.string().default(''),
  completed: z.boolean().default(false),
});
export type FollowUp = z.infer<typeof followUpSchema>;

export const formFieldType = z.enum(['text', 'number', 'date', 'single_choice', 'multi_choice', 'yes_no', 'phone', 'email']);

export const formFieldSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  label: z.string().min(1),
  type: formFieldType,
  required: z.boolean().default(false),
  options: z.array(z.string()).default([]),
  order: z.number().default(0),
});
export type FormField = z.infer<typeof formFieldSchema>;

export const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  description: z.string().default(''),
  fields: z.array(formFieldSchema).default([]),
  createdAt: z.string().optional(),
});
export type FormDef = z.infer<typeof formSchema>;

export const publicSubmissionSchema = z.object({
  id: z.string().optional(),
  formId: z.string(),
  customerId: z.string().optional(),
  data: z.record(z.string(), z.unknown()).default({}),
  status: z.enum(['new', 'reviewed', 'merged']).default('new'),
  createdAt: z.string().optional(),
});
export type PublicSubmission = z.infer<typeof publicSubmissionSchema>;

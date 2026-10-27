import { customerSchema, type Customer } from '~/lib/schemas';
import { interactionSchema, type Interaction } from '~/lib/schemas';
import { followUpSchema, type FollowUp } from '~/lib/schemas';
import { kvGet, kvPut } from '~/lib/kv';

type CustomerRow = Customer & { createdAt?: string };

async function readCustomers(): Promise<CustomerRow[]> {
  const raw = await kvGet<CustomerRow[]>('customers');
  return raw ?? [];
}

async function writeCustomers(data: CustomerRow[]) {
  await kvPut('customers', data);
}

function now() { return new Date().toISOString(); }
function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }

export async function listCustomers(): Promise<Customer[]> {
  return readCustomers();
}

export async function saveCustomer(input: Customer): Promise<Customer> {
  const data = customerSchema.parse(input);
  const customers = await readCustomers();
  const exists = customers.find((c) => c.id === data.id);
  const record: CustomerRow = { ...data, createdAt: exists?.createdAt ?? now() };
  if (!record.id) record.id = uid();
  const next = customers.filter((c) => c.id !== record.id);
  next.push(record);
  await writeCustomers(next);
  return record;
}

export async function deleteCustomer(id: string) {
  const customers = await readCustomers();
  await writeCustomers(customers.filter((c) => c.id !== id));
}

async function readInteractions(): Promise<Interaction[]> {
  const raw = await kvGet<Interaction[]>('interactions');
  return raw ?? [];
}

async function writeInteractions(data: Interaction[]) {
  await kvPut('interactions', data);
}

export async function listInteractions(customerId: string): Promise<Interaction[]> {
  const all = await readInteractions();
  return all.filter((i) => i.customerId === customerId);
}

export async function saveInteraction(input: Interaction): Promise<Interaction> {
  const data = interactionSchema.parse(input);
  const all = await readInteractions();
  const record = { ...data, id: data.id ?? uid() };
  const next = all.filter((i) => i.id !== record.id);
  next.push(record);
  await writeInteractions(next);
  return record;
}

async function readFollowUps(): Promise<FollowUp[]> {
  const raw = await kvGet<FollowUp[]>('followups');
  return raw ?? [];
}

async function writeFollowUps(data: FollowUp[]) {
  await kvPut('followups', data);
}

export async function listFollowUps(): Promise<FollowUp[]> {
  return readFollowUps();
}

export async function saveFollowUp(input: FollowUp): Promise<FollowUp> {
  const data = followUpSchema.parse(input);
  const all = await readFollowUps();
  const record = { ...data, id: data.id ?? uid() };
  const next = all.filter((i) => i.id !== record.id);
  next.push(record);
  await writeFollowUps(next);
  return record;
}

async function readForms(): Promise<FormDef[]> {
  const raw = await kvGet<FormDef[]>('forms');
  return raw ?? [];
}

async function writeForms(data: FormDef[]) {
  await kvPut('forms', data);
}

export async function listForms(): Promise<FormDef[]> {
  return readForms();
}

export async function saveForm(input: FormDef): Promise<FormDef> {
  const data = formSchema.parse(input);
  const all = await readForms();
  const record = { ...data, id: data.id ?? uid(), createdAt: data.createdAt ?? now() };
  const next = all.filter((f) => f.id !== record.id);
  next.push(record);
  await writeForms(next);
  return record;
}

export async function deleteForm(id: string) {
  const all = await readForms();
  await writeForms(all.filter((f) => f.id !== id));
}

async function readPublicSubmissions(): Promise<PublicSubmission[]> {
  const raw = await kvGet<PublicSubmission[]>('publicSubmissions');
  return raw ?? [];
}

async function writePublicSubmissions(data: PublicSubmission[]) {
  await kvPut('publicSubmissions', data);
}

export async function listPublicSubmissions(): Promise<PublicSubmission[]> {
  return readPublicSubmissions();
}

export async function savePublicSubmission(input: PublicSubmission): Promise<PublicSubmission> {
  const data = publicSubmissionSchema.parse(input);
  const all = await readPublicSubmissions();
  const record = { ...data, id: data.id ?? uid(), createdAt: data.createdAt ?? now() };
  const next = all.filter((s) => s.id !== record.id);
  next.push(record);
  await writePublicSubmissions(next);
  return record;
}

export async function updatePublicSubmissionStatus(id: string, status: PublicSubmission['status']) {
  const all = await readPublicSubmissions();
  const idx = all.findIndex((s) => s.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], status };
    await writePublicSubmissions(all);
  }
  return all[idx];
}

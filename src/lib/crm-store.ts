import { customerSchema, type Customer, salesmanSchema, type Salesman } from '~/lib/schemas';
import { interactionSchema, type Interaction } from '~/lib/schemas';
import { followUpSchema, type FollowUp } from '~/lib/schemas';
import { formSchema, type FormDef } from '~/lib/schemas';
import { publicSubmissionSchema, type PublicSubmission } from '~/lib/schemas';
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

// Salesman CRUD operations
async function readSalesmen(): Promise<Salesman[]> {
  const raw = await kvGet<Salesman[]>('salesmen');
  return raw ?? [];
}

async function writeSalesmen(data: Salesman[]) {
  await kvPut('salesmen', data);
}

export async function listSalesmen(): Promise<Salesman[]> {
  const salesmen = await readSalesmen();
  return salesmen.sort((a, b) => a.name.localeCompare(b.name));
}

export async function saveSalesman(input: Salesman): Promise<Salesman> {
  const data = salesmanSchema.parse(input);
  const salesmen = await readSalesmen();
  const record: Salesman = { ...data, id: data.id ?? uid() };
  const next = salesmen.filter((s) => s.id !== record.id);
  next.push(record);
  await writeSalesmen(next);
  return record;
}

export async function deleteSalesman(id: string) {
  const salesmen = await readSalesmen();
  await writeSalesmen(salesmen.filter((s) => s.id !== id));
}

// Seed initial salesmen
export async function seedInitialSalesmen() {
  const existing = await readSalesmen();
  if (existing.length > 0) return existing;
  
  const initialSalesmen: Salesman[] = [
    { id: uid(), name: 'Acesor José', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Juan', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor María', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Pedro', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Ana', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Carlos', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Laura', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Miguel', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Sofía', email: '', phone: '', commissionRate: 5, active: true },
    { id: uid(), name: 'Acesor Diego', email: '', phone: '', commissionRate: 5, active: true },
  ];
  
  await writeSalesmen(initialSalesmen);
  return initialSalesmen;
}

// Sales metrics
export async function getSalesMetrics() {
  const [salesmen, customers, interactions] = await Promise.all([
    listSalesmen(),
    listCustomers(),
    listInteractions(''),
  ]);
  
  const activeSalesmen = salesmen.filter(s => s.active);
  
  const metrics = activeSalesmen.map(s => {
    const assignedCustomers = customers.filter(c => c.salesmanId === s.id && c.status === 'active');
    const customerCount = assignedCustomers.length;
    const totalRevenue = assignedCustomers.reduce((sum, c) => {
      const purchaseValue = c.customValues?.purchaseValue || 0;
      return sum + (typeof purchaseValue === 'number' ? purchaseValue : 0);
    }, 0);
    
    return {
      ...s,
      customerCount,
      totalRevenue,
      averageCommission: totalRevenue * (s.commissionRate / 100),
    };
  });
  
  const totalCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => {
    const purchaseValue = c.customValues?.purchaseValue || 0;
    return sum + (typeof purchaseValue === 'number' ? purchaseValue : 0);
  }, 0);
  
  return {
    salesmen: metrics,
    summary: {
      totalSalesmen: salesmen.length,
      activeSalesmen: activeSalesmen.length,
      totalCustomers,
      totalRevenue,
      avgCustomersPerSalesman: activeSalesmen.length > 0 ? totalCustomers / activeSalesmen.length : 0,
      avgRevenuePerSalesman: activeSalesmen.length > 0 ? totalRevenue / activeSalesmen.length : 0,
    }
  };
}

// Interactions
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

// FollowUps
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

// Forms
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

// Public Submissions
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
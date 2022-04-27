import { format } from 'date-fns';

export function formatIso(iso: string | undefined | null) {
  if (!iso) return 'invalid';
  return format(new Date(iso), 'dd.MM.yyyy HH:mm');
}

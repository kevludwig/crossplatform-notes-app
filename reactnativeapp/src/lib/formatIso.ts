import { format } from 'date-fns';

/**
 * format an ISO date string to a human readable format
 *
 * @param iso
 * @returns formatted time string
 */
export function formatIso(iso: string | undefined | null) {
  if (!iso) return 'invalid';
  return format(new Date(iso), 'dd.MM.yyyy HH:mm');
}

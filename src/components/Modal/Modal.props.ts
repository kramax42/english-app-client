import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  title: string;
  modalTrigger: ReactNode;
}

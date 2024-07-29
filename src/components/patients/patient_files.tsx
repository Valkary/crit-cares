'use server'

import { get_patient_documents } from '~/data/files'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import ViewFileButton from './view_file_button'

export default async function PatientFiles({
  patient_id,
}: { patient_id: number }) {
  const res = await get_patient_documents(patient_id)
  if (!res.success) return <span>Error</span>

  const files = res.data

  return (
    <Table>
      <TableCaption>Tabla de documentos de pacientes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Expandir</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => {
          return (
            <TableRow key={file.id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.creation_date?.toLocaleDateString()}</TableCell>
              <TableCell>
                <ViewFileButton file={file} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

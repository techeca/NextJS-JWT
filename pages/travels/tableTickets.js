import { Table, Button } from 'evergreen-ui'
import LoadingComp from '../components/loading'

function setHourPoint(hour){
  const str = hour.toString().slice(0, 2)+':'+hour.toString().slice(2, 4);
  return (str)
}

export default function TableTickets(e){
  return(
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell />
        <Table.TextHeaderCell marginLeft={-50}>Origen</Table.TextHeaderCell>
        <Table.TextHeaderCell marginLeft={-110}>Destino</Table.TextHeaderCell>
        <Table.TextHeaderCell marginLeft={-100}>Costo</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height='auto' width='auto' marginLeft={30}>
        {e.isLoadingList ? <LoadingComp /> : ( e.travels.map((t) =>
          <Table.Row key={t.idtravel} >
            <Table.TextCell>{setHourPoint(t.horaSalida)} Hrs.</Table.TextCell>
            <Table.TextCell>{t.origen}</Table.TextCell>
            <Table.TextCell>{t.destino}</Table.TextCell>
            <Table.TextCell>${t.costoViaje}</Table.TextCell>
            <Table.TextCell>
            <Button appearance='primary' intent='danger' display='flex' onClick={() => e.showTravelDetail(t)}>Detalles</Button>
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )}

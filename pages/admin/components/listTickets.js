import {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Pane, Card, Strong, toaster, Heading, IconButton, CrossIcon, Table, Badge, Pagination, Dialog, Avatar, Button, AreaOfInterestIcon, Paragraph, Text } from 'evergreen-ui'
import { UserIcon, LogOutIcon, HomeIcon } from 'evergreen-ui'
//import {isMobile} from 'react-device-detect'
import { adminService } from '@services/index'
import LoadingComp from '../../components/loading'

export default function ListTickets(listTickets){
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    function paginate(array, pageSize, pageNumber) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    }
    //Cambio de paginas
    const handlePageChange = async (e) => {
      setPage(e);
    }
   //const diasjs = JSON.parse(t)

   if(listTickets.length === 0){
     return(
       <></>
     )
   }else {
     const stringdata = JSON.stringify(listTickets.listTickets);
     const parsedata = JSON.parse(stringdata);

     //console.log(parsedata)
     //let name = `${ticketSelected.name} ${ticketSelected.lastName}`
     //const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = JSON.parse(parsedata.dias)
     //console.log(parsedata)
     return(
       <Pane marginBottom={35}>

         <Pane display='flex'  flexDirection='column' height='85vh' alignItems='center' justifyContent='start' paddingTop='3%'>
           <Card elevation={1} width='80%'>
             <Table>
               <Table.Head>
                 <Table.SearchHeaderCell />
                 <Table.TextHeaderCell >Origen - Destino</Table.TextHeaderCell>
                 <Table.TextHeaderCell >Nº Asiento</Table.TextHeaderCell>
                 <Table.TextHeaderCell >Fecha</Table.TextHeaderCell>
                 <Table.TextHeaderCell >Hora Salida</Table.TextHeaderCell>
                 <Table.TextHeaderCell >Costo Viaje</Table.TextHeaderCell>
               </Table.Head>
               <Table.Body height='auto' width='100%'>
                 {isLoading ? <LoadingComp /> : ( paginate(parsedata,10,page).map((p) =>
                   <Table.Row isSelectable key={p.idTicket}>
                   <Table.TextCell>{p.code}</Table.TextCell>
                   <Table.TextCell>{p.origen} - {p.destino}</Table.TextCell>
                     <Table.TextCell>{p.nroAsiento}</Table.TextCell>
                     <Table.TextCell>{p.fecha}</Table.TextCell>
                     <Table.TextCell>{p.horaSalida} Hrs.</Table.TextCell>
                     <Table.TextCell>${p.costoViaje}</Table.TextCell>
                   </Table.Row>
                 ))}
               </Table.Body>
             </Table>
           </Card>
           <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPage}></Pagination>
         </Pane>
       </Pane>
     )
   }
 }

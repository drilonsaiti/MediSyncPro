import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import Modal from "../../ui/Modal.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {HiPencil, HiTrash} from "react-icons/hi";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import styled from "styled-components";
import CreateClinicServiceForm from "./CreateClinicServiceForm.jsx";
import {useCreateClinicService} from "./useCreateClinicService.js";
import {useDeleteClinicService} from "./useDeleteClinicService.js";
import {formatCurrency} from "../../utils/helpers.js";

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Price = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 600;
`;

const ClinicServiceRow = ({clinicService}) => {
    const {serviceId, serviceName: name, durationMinutes, price, specializations} = clinicService;
    const {isCreating, createClinicService} = useCreateClinicService();
    const {isDeleting, deleteMutate} = useDeleteClinicService();

    return (
        <Table.Row role="row">
            <Title>{serviceId}</Title>
            <Title>{name}</Title>
            <Title>{durationMinutes}min</Title>
            <Price>{formatCurrency(price)}</Price>
            <Title>{specializations.specializationName}</Title>
            <Modal>
                <ButtonGroup>

                    <Menus.Menu>
                        <Menus.Toggle id={serviceId}/>
                        <Menus.List id={serviceId}>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>


                </ButtonGroup>

                <Modal.Window name="edit">
                    <CreateClinicServiceForm clinicServiceToEdit={clinicService}/>
                </Modal.Window>

                <Modal.Window name="delete">
                    <ConfirmDelete resource="service" disabled={isDeleting}
                                   onConfirm={() => deleteMutate(serviceId)}/>
                </Modal.Window>

            </Modal>
        </Table.Row>
    );
};

export default ClinicServiceRow;
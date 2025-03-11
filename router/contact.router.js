
import express,{ Router } from 'express' 
import { createContact, deleteContact, getAllContacts, getSingleContact, updateContact } from '../controllers/contact.controller.js';

const router = Router();

router.route('/create-contact').post(createContact);
router.route('/contacts').get(getAllContacts);
router.route('/update/:id').put(updateContact);
router.route('/delete/:id').delete(deleteContact);
router.route('/single-contact/:id').get(getSingleContact);

export default router;




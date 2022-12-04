import React, { useState } from 'react';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import {
  Button, FormFeedback, FormGroup, Input, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import schema from './form-validation/board-form-schema';
import {
  defaultMessage,
  maxBoardTitleCustomMessage,
  minBoardTitleCustomMessage,
  minLengthCustomMessage,
  maxLengthCustomMessage,
  patternBoardTitleCustomMessage,
} from './form-validation/board-custom-message';
import { checkBoardNameAvailability } from '../../../services/APIService';

export default function BoardForm({ submitCallBack }) {
  const [isBoardTitleAvailable, setIsBoardTitleAvailable] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    length: 32,
    dateOfClosure: '',
    intervalPixel: 60,
    multipleDrawPixel: false,
  });

  function isBoardNameValid(username) {
    return username.match(/^[a-zA-Z0-9]+$/)
      && username.length >= 4 && username.length <= 50;
  }

  const checkBoardTitle = async () => {
    const res = await checkBoardNameAvailability(formData.name);
    if (res.data.success) {
      setIsBoardTitleAvailable(true);
    } else {
      setIsBoardTitleAvailable(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check valid date
    if (new Date(formData.dateOfClosure).getTime() < Date.now() && !isBoardTitleAvailable) {
      return;
    }
    submitCallBack(formData);
  };
  const handleChange = (newData) => {
    setFormData(newData);
  };
  return (
    <Form
      data={formData}
      schema={schema}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errorMessages={{
        required: () => defaultMessage,
      }}
      className="form m-auto pt-5 size-form"
    >
      <div className="text-start">
        <FormGroup>
          <Label for="name">Titre du Board</Label>
          <Field
            component={Input}
            type="string"
            name="name"
            id="name"
            placeholder="Entrer un titre ..."
            valid={
              !!isBoardNameValid(formData.name) && isBoardTitleAvailable
            }
            invalid={!isBoardTitleAvailable}
            value={formData.name}
            onBlur={() => checkBoardTitle(formData.name)}
          />
          <FieldError
            errorMessages={{
              minLength: () => minBoardTitleCustomMessage,
              maxLength: () => maxBoardTitleCustomMessage,
              pattern: () => patternBoardTitleCustomMessage,
            }}
            name="name"
          />
          <FormFeedback valid>
            Ce titre est disponible
          </FormFeedback>
          <FormFeedback invalid="true">
            Ce titre est déjà pris !
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="length">Nombre de lignes</Label>
          <Field
            component={Input}
            type="number"
            name="length"
            id="length"
            placeholder="Entrer la taille de la grille ..."
            value={formData.length}
            valid={formData.length >= 8 && formData.length <= 128}
          />
          <FieldError
            errorMessages={{
              minimum: () => minLengthCustomMessage,
              maximum: () => maxLengthCustomMessage,
            }}
            name="length"
          />
        </FormGroup>
        <FormGroup>
          <Label for="dateOfClosure">Date de cloture</Label>
          <Field
            component={Input}
            type="date"
            name="dateOfClosure"
            id="dateOfClosure"
            value={formData.dateOfClosure}
            valid={
              new Date(formData.dateOfClosure).getTime() > Date.now()
            }
            invalid={new Date(formData.dateOfClosure).getTime() < Date.now()}
          />
          <FormFeedback invalid="true">
            La date de fin doit être postérieur à la date actuelle
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="intervalPixel">Intervale de temps (seconde)</Label>
          <Field
            component={Input}
            type="number"
            name="intervalPixel"
            id="intervalPixel"
            value={formData.intervalPixel}
            placeholder="Entrer le délai entre chaque édition de pixel en seconde ..."
            valid={formData.intervalPixel >= 0}
          />
        </FormGroup>
        <FormGroup className="d-flex justify-content-between">
          <Label for="multipleDrawPixel">Edition multiple </Label>
          <Field
            component={Input}
            name="multipleDrawPixel"
            type="checkbox"
            checked={formData.multipleDrawPixel}
          />
        </FormGroup>
      </div>
      <Button>
        Submit
      </Button>
    </Form>
  );
}
BoardForm.propTypes = {
  submitCallBack: PropTypes.func.isRequired,
};

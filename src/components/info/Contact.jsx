import React from "react";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  render() {
    const { status } = this.state;
    return (
      <FormContainer>
        <Grid item xs={12} sm={8}>
          <div className="title-info">
            <h1 className="contact-header">Contact</h1>
            <p className="contact-info">
              SUPI is a supplier management platform. It's designed to allow
              small to medium sized businesses to manage their suppliers by
              tracking purchase orders, invoices, supplier documents like
              licences, as well as rating their suppliers in terms of cost,
              quality, and reliability.
            </p>
            <p className="contact-info">
              If you have any questions about the platform, feel free to contact
              us with the form on this page.
            </p>
          </div>
          <div className="contact-form-container">
            <h3 className="contact-form-heading">Contact Form</h3>
            <Form
              onSubmit={this.submitForm}
              action="https://formspree.io/f/xwkwzypj"
              method="POST"
            >
              <div className="form-content">
                <label>Email:</label>
                <input type="email" name="email" />
              </div>
              <div className="form-content">
                <label>Message:</label>
                <textarea name="message" />
              </div>
              <div className="form-content">
                {status === "SUCCESS" ? (
                  <p>Thanks!</p>
                ) : (
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                )}
                {status === "ERROR" && <p>Ooops! There was an error.</p>}
              </div>
            </Form>
          </div>
        </Grid>
      </FormContainer>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}

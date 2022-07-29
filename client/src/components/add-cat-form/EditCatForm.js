import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategoryAction,
  updateCategoryAction,
} from "../../pages/categories/catAction";
import { CustomInput } from "../custom-input/CustomInput";

const initialState = {
  status: "inactive",
  name: "",
  parentCatId: null,
};
export const EditCatForm = ({ selectedCat }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { name, _id, parentCatId, status } = form;
    dispatch(updateCategoryAction({ name, _id, parentCatId, status }));
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row className="g-2 mt-3">
        <Col md="2">
          <Form.Group controlId="formGridState">
            <Form.Check
              name="status"
              label="status"
              type="switch"
              onChange={handleOnChange}
              checked={form.status === "active"}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group controlId="formGridState">
            <Form.Select
              name="parentCatId"
              defaultValue=""
              onChange={handleOnChange}
            >
              <option value="">Select Parent Category</option>
              {categories.map(
                (item) =>
                  item.parentCatId === null && (
                    <option
                      key={item._id}
                      value={item._id}
                      selected={item._id === form.parentCatId}
                    >
                      {item.name}
                    </option>
                  )
              )}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <CustomInput
            name="name"
            placeholder="Category Name"
            onChange={handleOnChange}
            value={form.name}
            required
          />
        </Col>
        <Col md="3">
          <Button type="submit">Update Category</Button>
        </Col>
      </Row>
    </Form>
  );
};

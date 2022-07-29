import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getCategoriesAction,
} from "../../pages/categories/catAction";
import { toggleShowModal } from "../../pages/system-state/systemSlice";
import { EditCatForm } from "../add-cat-form/EditCatForm";
import { CustomModal } from "../custom-modal/CustomModal";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [catToDelete, setCatToDelete] = useState([]);
  const [selectedCat, setSelectedCat] = useState({});

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    //header checkbox clic
    if (value === "all") {
      checked
        ? setCatToDelete(categories.map((item) => item._id))
        : setCatToDelete([]);

      return;
    }

    //individual item click
    if (checked) {
      //check if the vale exist in parentCatId

      const hasChildCat = categories.filter(
        (item) => item.parentCatId === value
      );

      if (hasChildCat.length) {
        return alert(
          "This category has depended child categories, Pelase delete child categories or re assign to another parent category before deleting."
        );
      }

      // add value to the list
      setCatToDelete([...catToDelete, value]);
    } else {
      //take out of the list
      setCatToDelete(catToDelete.filter((id) => id !== value));
    }
  };

  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to delete selected categories")) {
      dispatch(deleteCategoryAction({ ids: catToDelete }));
      setCatToDelete([]);
    }
  };

  const handleOnEdit = (catObj) => {
    dispatch(toggleShowModal(true));
    setSelectedCat(catObj);
  };

  const parentCats = categories.filter((item) => !item.parentCatId);
  const childCats = categories.filter((item) => item.parentCatId);

  return (
    <Row className="mt-5">
      <Col>
        <CustomModal title={"Update Category"}>
          <EditCatForm selectedCat={selectedCat} />
        </CustomModal>

        <p>{categories.length} Categories found </p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check value="all" onChange={handleOnSelect} />
              </th>
              <th> Status</th>
              <th> Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parentCats.map((item) => (
              <>
                <tr key={item._id} className="bg-warning">
                  <td>
                    {" "}
                    <Form.Check
                      value={item._id}
                      onChange={handleOnSelect}
                      checked={catToDelete.includes(item._id)}
                    />
                  </td>
                  <td>{item.status}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>

                {childCats.map(
                  (cat) =>
                    cat.parentCatId === item._id && (
                      <tr key={cat._id}>
                        <td>
                          {" "}
                          <Form.Check
                            value={cat._id}
                            onChange={handleOnSelect}
                            checked={catToDelete.includes(cat._id)}
                          />
                        </td>
                        <td> --- {cat.status}</td>
                        <td>{cat.name}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleOnEdit(cat)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    )
                )}
              </>
            ))}
          </tbody>
        </Table>
        {catToDelete.length > 0 && (
          <Button variant="danger" onClick={handleOnDelete}>
            Delete selected {catToDelete.length} categories
          </Button>
        )}
      </Col>
    </Row>
  );
};

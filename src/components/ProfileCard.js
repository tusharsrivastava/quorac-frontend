import { BiPlusCircle } from "react-icons/bi";
import { useState, useCallback } from 'react';
import { Formik } from "formik";
import Select from "../components/Select";

const ProfileMain = (props) => {
    const { viewOnly, user } = props;

    return (
    <>
      <img src={`${user.profileThumbnail || '/person.png'}`} className="img-fluid rounded-circle border" width="100" alt="User avatar" />
      <div className="d-flex flex-column mt-3 pb-3 border-bottom">
        <div className="d-flex flex-md-row flex-column justify-content-between">
            <span className="fw-700">{user.firstName} {user.lastName}</span>
            <span className="badge bg-danger align-content-center mt-1 align-self-start mb-1 mb-md-0">
                Level {user.level}
            </span>
        </div>
        <span className="text-primary">@{user.username}</span>
        <p className="fsize-14 text-muted mt-2 mb-4">
            {user.description || 'No description'}
        </p>
        <div className="d-flex">
            <span className="fw-500 fsize-14"><b>Following:</b> {user.followingCount}</span>
            <span className="fw-500 fsize-14 ms-3"><b>Followers:</b> {user.followersCount}</span>
        </div>
      </div>
    </>
    );
}

const ProfileIntro = (props) => {
    const { viewOnly, toggleEditMode, isEditMode } = props;


    if (isEditMode) {
      return (
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5>Intro</h5>
          <Formik
            initialValues={{
              works_at: "",
              studied_at: "",
              lives_in: "",
              interests: [],
              knowledges: [],
              languages: [],
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              toggleEditMode();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              isSubmitting,
            }) => (
              <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <table className="table mt-3 customTable">
                  <tbody>
                    <tr>
                      <th>Works at</th>
                      <td>
                        <input
                          type="text"
                          name="works_at"
                          onChange={handleChange}
                          value={values.works_at}
                          className="form-control fsize-14 rounded-0 ms-0 flex-fill"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Studied at</th>
                      <td>
                        <input
                          type="text"
                          name="studied_at"
                          onChange={handleChange}
                          value={values.studied_at}
                          className="form-control fsize-14 rounded-0 ms-0 flex-fill"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Lives in</th>
                      <td>
                        <input
                          type="text"
                          name="lives_in"
                          onChange={handleChange}
                          value={values.lives_in}
                          className="form-control fsize-14 rounded-0 ms-0 flex-fill"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Interest in</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isMulti
                          isCreatable
                          options={[]}
                          name="interests"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Knows about</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isMulti
                          isCreatable
                          options={[]}
                          name="knowledges"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Languages known</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isMulti
                          isCreatable
                          options={[
                            {
                              value: "English",
                              label: "English",
                            },
                            {
                              value: "Hindi",
                              label: "Hindi",
                            },
                            {
                              value: "French",
                              label: "French",
                            },
                            {
                              value: "Spanish",
                              label: "Spanish",
                            },
                            {
                              value: "German",
                              label: "German",
                            },
                            {
                              value: "Italian",
                              label: "Italian",
                            },
                          ]}
                          name="languages"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          options={[
                            {
                              value: "male",
                              label: "Male",
                            },
                            {
                              value: "female",
                              label: "Female",
                            },
                          ]}
                          name="gender"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary rounded-0 px-4 fsize-14 flex-grow-0 flex-shrink-0"
                  disabled={isSubmitting}
                >
                  Save Changes
                </button>
              </form>
            )}
          </Formik>
        </div>
      );
    }

    return (
      <div className="d-flex flex-column mt-3 pb-3 border-bottom">
        <h5>Intro</h5>
        <table className="table mt-3 customTable">
          <tbody>
            <tr>
              <th>Works at</th>
              <td>Company Name</td>
            </tr>
            <tr>
              <th>Studied at</th>
              <td>College Name</td>
            </tr>
            <tr>
              <th>Lives in</th>
              <td>Delhi, India</td>
            </tr>
            <tr>
              <th>Interest in</th>
              <td>Hobbies, etc</td>
            </tr>
            <tr>
              <th>Knows about</th>
              <td>Something known</td>
            </tr>
            <tr>
              <th>Languages known</th>
              <td>Hindi, English</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>Male</td>
            </tr>
          </tbody>
        </table>
        {viewOnly ? (<></>) : (
        <button className="btn btn-outline-dark fsize-14" onClick={toggleEditMode}>Edit Profile</button>
        )}
      </div>
    );
};

const ProfileAdditionalInfo = (props) => {
    return (
      <>
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5 className="mb-0">Additional Information</h5>
        </div>
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5 className="mb-4">Interest and Knowledge</h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-500 fsize-14">Interests in</span>
            <BiPlusCircle />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-500 fsize-14">Knows about</span>
            <BiPlusCircle />
          </div>
        </div>
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5 className="mb-4">Work and Education</h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-500 fsize-14">Work</span>
            <BiPlusCircle />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-500 fsize-14">University</span>
            <BiPlusCircle />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-500 fsize-14">School</span>
            <BiPlusCircle />
          </div>
        </div>
      </>
    );
}


export const ProfileCard = (props) => {
  const { isEditable, user } = props;
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (!isEditable) {
      return;
    }
    setEditMode((oldState) => !oldState);
  }, [isEditable]);

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white p-4">
      <ProfileMain
        user={user}
        viewOnly={!isEditable}
        toggleEditMode={toggleEditMode}
        isEditMode={editMode}
      />
      <ProfileIntro
        user={user}
        viewOnly={!isEditable}
        toggleEditMode={toggleEditMode}
        isEditMode={editMode}
      />
      <ProfileAdditionalInfo
        user={user}
        viewOnly={!isEditable}
        toggleEditMode={toggleEditMode}
        isEditMode={editMode}
      />
    </div>
  );
};

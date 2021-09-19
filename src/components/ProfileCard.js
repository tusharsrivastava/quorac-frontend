import { BiPlusCircle } from "react-icons/bi";
import { useState, useCallback } from 'react';
import { Formik } from "formik";
import Select from "../components/Select";
import { useDispatch } from "react-redux";
import { fetchCompanies, fetchHobbies, fetchSchools, fetchLanguages, updateProfile } from "../app/features/profile";

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
    const { viewOnly, user, toggleEditMode, isEditMode } = props;
    const dispatch = useDispatch();


    if (isEditMode) {
      return (
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5>Intro</h5>
          <Formik
            initialValues={{
              works_at: "",
              studied_at: "",
              lives_in: "",
              hobbies: [],
              knowledges: [],
              languages: [],
              gender: "Female",
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const payload = {
                works: [{ company: {
                  id: values.works_at.id ? values.works_at.id : undefined,
                  name: values.works_at.name,
                } }],
                educations: [{ school: {
                  id: values.studied_at.id ? values.studied_at.id : undefined,
                  name: values.studied_at.name,
                 } }],
                hobbies: values.hobbies.map(hobby => ({
                  id: hobby.id ? hobby.id : undefined,
                  name: hobby.name,
                })),
                languages: values.languages.map(language => ({
                  id: language.id ? language.id : undefined,
                  name: language.name,
                })),
                gender: values.gender.id,
              };
              console.log(payload);
              dispatch(updateProfile(payload));
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
                      <td style={{ minWidth: "14rem" }}>
                        <Select
                          className="fsize-14 rounded-0 ms-0 flex-fill"
                          isCreatable
                          isAsync
                          defaultOptions={[]}
                          loadOptions={(term) =>
                            fetchCompanies({ term: term, limit: 10 })
                          }
                          name="works_at"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Studied at</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isCreatable
                          isAsync
                          defaultOptions={[]}
                          loadOptions={(term) =>
                            fetchSchools({ term: term, limit: 10 })
                          }
                          name="studied_at"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Lives in</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isCreatable
                          options={[]}
                          name="lives_in"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Interest in</th>
                      <td>
                        <Select
                          className="fsize-14 rounded-0 ms-0"
                          isMulti
                          isAsync
                          isCreatable
                          defaultOptions={[]}
                          loadOptions={(term) =>
                            fetchHobbies({ term: term, limit: 10 })
                          }
                          name="hobbies"
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
                          isAsync
                          isCreatable
                          defaulOptions={[]}
                          loadOptions={(term) =>
                            fetchLanguages({ term: term, limit: 10 })
                          }
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
                              value: "Male",
                              label: "Male",
                            },
                            {
                              value: "Female",
                              label: "Female",
                            },
                            {
                              value: "Others",
                              label: "Others",
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
              <td>
                {user.profile
                  ? user.profile.works
                    ? user.profile.works[0].company?.name
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Studied at</th>
              <td>
                {user.profile
                  ? user.profile.educations
                    ? user.profile.educations[0].school?.name
                    : "N/A"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Lives in</th>
              <td>N/A</td>
            </tr>
            <tr>
              <th>Interest in</th>
              <td>
                {user.profile
                  ? user.profile.hobbies?.map((hobby) => (
                      <span className="badge bg-primary me-1">
                        {hobby.name}
                      </span>
                    ))
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Knows about</th>
              <td>N/A</td>
            </tr>
            <tr>
              <th>Languages known</th>
              <td>
                {user.profile
                  ? user.profile.languages?.map((lang) => (
                      <span className="badge bg-primary me-1">
                        {lang.name}
                      </span>
                    ))
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{user.profile ? user.profile.gender : 'Unknown'}</td>
            </tr>
          </tbody>
        </table>
        {viewOnly ? (
          <></>
        ) : (
          <button
            className="btn btn-outline-dark fsize-14"
            onClick={toggleEditMode}
          >
            Edit Profile
          </button>
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

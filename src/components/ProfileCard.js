import { BiPlusCircle } from "react-icons/bi";

const ProfileMain = (props) => {
    const { viewOnly, user } = props;

    return (
    <>
      <img src="/person.png" className="img-fluid rounded-circle border" width="100" alt="User avatar" />
      <div className="d-flex flex-column mt-3 pb-3 border-bottom">
        <div className="d-flex flex-md-row flex-column justify-content-between">
            <span className="fw-700">{user.firstName} {user.lastName}</span>
            <span className="badge bg-danger align-content-center mt-1 align-self-start mb-1 mb-md-0">
                Level 5
            </span>
        </div>
        <span className="text-primary">@{user.username}</span>
        <p className="fsize-14 text-muted mt-2 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit fugiat facere adipisci modi aspernatur. Modi.
        </p>
        <div className="d-flex">
            <span className="fw-500 fsize-14"><b>Following:</b> 120</span>
            <span className="fw-500 fsize-14 ms-3"><b>Followers:</b> 276</span>
        </div>
      </div>
    </>
    );
}

const ProfileIntro = (props) => {
    const { viewOnly } = props;

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
              <td>Gender Name</td>
            </tr>
          </tbody>
        </table>
        {viewOnly ? (<></>) : (
        <button className="btn btn-outline-dark fsize-14">Edit Profile</button>
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
        <div className="d-flex flex-column mt-3 pb-3 border-bottom">
          <h5 className="mb-4">Contact Details</h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-500 fsize-14">Email ID</span>
            <BiPlusCircle />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-500 fsize-14">Social Links</span>
            <BiPlusCircle />
          </div>
        </div>
        <div className="d-flex flex-column mt-3 pb-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-500 fsize-14">Achievements</span>
            <BiPlusCircle />
          </div>
        </div>
      </>
    );
}


export const ProfileCard = (props) => {
  const { isEditable, user } = props;

  return (
    <div className="card shadow-sm mb-4 border-0 rounded-0 bg-white p-4">
      <ProfileMain user={user} viewOnly={!isEditable} />
      <ProfileIntro user={user} viewOnly={!isEditable} />
      <ProfileAdditionalInfo user={user} viewOnly={!isEditable} />
    </div>
  );
};

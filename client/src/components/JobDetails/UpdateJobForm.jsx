/* import "./UpdateJobForm.css"; */
import "../../App.css";

export const UpdateJobForm = () => {
  return (
    <div /* className="form" */>
      <form className="form">
        <h3>UPDATE JOB</h3>
        {/* <label htmlFor="category">Category</label> */}
        <select>
          <option value="" disabled selected>
            change status to...
          </option>
          <option value="true">APPLIED</option>
          <option value="false">NOT APPLIED</option>
        </select>
        <button type="submit">ARCHIVE</button>
      </form>
    </div>
  );
};

/* import "./UpdateJobForm.css"; */
import "../../App.css";

export const UpdateJobForm = () => {
  return (
    <div>
      <form className="form">
        <h3>UPDATE JOB</h3>

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

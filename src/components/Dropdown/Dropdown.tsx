import { useNavigate } from 'react-router-dom'
import styles from './Dropdown.module.scss'


const Dropdown = () => {

let navigate = useNavigate();

const navToPage = (e: React.MouseEvent<HTMLLIElement>
) => {
    const val = e.currentTarget.dataset.value;
    console.log(val);
    navigate(`/${val}`);
}


  return (
    <div className={styles.container}>
      <ul>
        <li data-value="postcode" onClick={navToPage}>🔍 Find a postcode</li>
        <li data-value="suburb" onClick={navToPage}> 📍 Find suburbs</li>
        <li data-value="addsuburb" onClick={navToPage}>➕ Add a suburb</li>
      </ul>
    </div>
  )
}

export default Dropdown

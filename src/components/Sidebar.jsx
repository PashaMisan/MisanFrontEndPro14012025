function Sidebar() {
    return (
        <div className="bg-light p-3 h-100">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Головна</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Про нас</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Контакти</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar
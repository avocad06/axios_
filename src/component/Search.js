import { IoClose } from 'react-icons/io5'

const Search = ({ onClose }) => {
    return (
        <div className="Search">
            <div class="search-box">
                <input type="text" placeholder="검색어를 입력하세요" />
                <button onClick={onClose} className="close-btn">
                    <IoClose />
                </button>
            </div>
        </div>
    )
}

export default Search
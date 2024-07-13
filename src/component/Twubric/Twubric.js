import React, { useEffect, useState } from "react";
import twubricJson from "../../utils/twubric.json";
import styles from "./twubric.module.css";
import SingleTwubric from "../SingleTwubric/SingleTwubric";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { TbSortDescendingNumbers } from "react-icons/tb";
import { TbSortAscendingNumbers } from "react-icons/tb";
import { toast } from "react-toastify";

const Twubric = () => {
  const [usersData, setUsersData] = useState([]);
  const [showSortMenu, setSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState("Sort By");
  const [storeUsersData, setStoreUsersData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowSort = () => {
    setSortMenu(!showSortMenu);
  };

  // sort function
  const sortData = (key, direction) => {
    let sortedUsersData = {};
    if (direction === "ascending") {
      sortedUsersData = storeUsersData.sort(
        (a, b) => a.twubric[key] - b.twubric[key]
      );
    } else {
      sortedUsersData = storeUsersData.sort(
        (a, b) => b.twubric[key] - a.twubric[key]
      );
    }
    setUsersData(sortedUsersData);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
    setSortMenu(showSortMenu);
    setSortBy(key === "total" ? "twubric" : key);
  };

  // filter Date function
  const handleFilter = () => {
    if (!startDate || !endDate) {
      toast.error("Select valid date range");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filteredData = storeUsersData.filter((user) => {
      const joinedDate = new Date(user.join_date * 1000);
      return joinedDate >= start && joinedDate <= end;
    });
    setUsersData(filteredData);
  };

  const handleReset = () => {
    setUsersData(storeUsersData);
    setEndDate("");
    setStartDate("");
  };

  // user remove function
  const handleRemove = (uid) => {
    const filteredStoreData = storeUsersData.filter((user) => user.uid !== uid);
    const filteredUserData = usersData.filter((user) => user.uid !== uid);
    setStoreUsersData(filteredStoreData);
    setUsersData(filteredUserData);
    toast.success("User removed Successfully");
  };

  useEffect(() => {
    setUsersData(twubricJson);
    setStoreUsersData(twubricJson);
  }, []);

  // handleing shortcut function
  const handleShortCut = (event) => {
    switch (event.key) {
      case "t": // Sort by total
        handleSort("total");
        break;
      case "f": // Sort by friends
        handleSort("friends");
        break;
      case "i": // Sort by influence
        handleSort("influence");
        break;
      case "c": // Sort by chirpiness
        handleSort("chirpiness");
        break;
      case "ArrowDown": // Select next user
        if (selectedUser === null) {
          setSelectedUser(0);
        } else if (selectedUser < usersData.length - 1) {
          setSelectedUser(selectedUser + 1);
        }
        break;
      case "ArrowUp": // Select previous user
        if (selectedUser > 0) {
          setSelectedUser(selectedUser - 1);
        } else {
          setSelectedUser(0);
        }
        break;
      case "Delete": // Remove selected user
        if (selectedUser !== null) {
          const userId = usersData[selectedUser].uid;
          handleRemove(userId);
          setSelectedUser(null);
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleShortCut);
    return () => {
      window.removeEventListener("keydown", handleShortCut);
    };
    //eslint-disable-next-line
  }, [selectedUser, sortConfig, usersData]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.sort} poppins-400`} onClick={handleShowSort}>
          {sortBy}
          {showSortMenu ? (
            <IoIosArrowUp className={styles.icon} />
          ) : (
            <IoIosArrowDown className={styles.icon} />
          )}
          {showSortMenu && (
            <div
              className={`${styles.sortMenuContainer} bg-white font-14 poppins-500`}
            >
              <div
                className={`${styles.sortMenu} ${
                  sortConfig.key === "friends" && styles.activeSort
                }`}
                onClick={() => handleSort("friends")}
              >
                Friends{" "}
                {sortConfig.key === "friends" &&
                  (sortConfig.direction === "ascending" ? (
                    <TbSortDescendingNumbers className={styles.red} />
                  ) : (
                    <TbSortAscendingNumbers className={styles.green} />
                  ))}
              </div>
              <div
                className={`${styles.sortMenu} ${
                  sortConfig.key === "influence" && styles.activeSort
                }`}
                onClick={() => handleSort("influence")}
              >
                Influence{" "}
                {sortConfig.key === "influence" &&
                  (sortConfig.direction === "ascending" ? (
                    <TbSortDescendingNumbers className={styles.red} />
                  ) : (
                    <TbSortAscendingNumbers className={styles.green} />
                  ))}
              </div>
              <div
                className={`${styles.sortMenu} ${
                  sortConfig.key === "chirpiness" && styles.activeSort
                }`}
                onClick={() => handleSort("chirpiness")}
              >
                Chirpiness{" "}
                {sortConfig.key === "chirpiness" &&
                  (sortConfig.direction === "ascending" ? (
                    <TbSortDescendingNumbers className={styles.red} />
                  ) : (
                    <TbSortAscendingNumbers className={styles.green} />
                  ))}
              </div>
              <div
                className={`${styles.sortMenu} ${
                  sortConfig.key === "total" && styles.activeSort
                }`}
                onClick={() => handleSort("total")}
              >
                Twubric{" "}
                {sortConfig.key === "total" &&
                  (sortConfig.direction === "ascending" ? (
                    <TbSortDescendingNumbers className={styles.red} />
                  ) : (
                    <TbSortAscendingNumbers className={styles.green} />
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.filter}>
          <div className={`poppins-500`}>Joined Twitter between</div>
          <div className={styles.dateRange}>
            <div className={styles.date}>
              <label className={`${styles.datepicker} poppins-500`}>
                {startDate ? (
                  <span style={{ color: "black" }}>{startDate}</span>
                ) : (
                  <>Start&nbsp;Date</>
                )}
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.date}>
              <label className={`${styles.datepicker} poppins-500`}>
                {endDate ? (
                  <span style={{ color: "black" }}>{endDate}</span>
                ) : (
                  <>End&nbsp;Date</>
                )}
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button
            className={`${styles.filterBtn} poppins-600`}
            onClick={handleFilter}
          >
            Filter
          </button>
          <button
            className={`${styles.reset} poppins-600`}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className={styles.twubricContainer}>
        {usersData.map((user, index) => (
          <SingleTwubric
            key={user.uid}
            userData={user}
            handleRemove={handleRemove}
            selectedUserStyle={index === selectedUser ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Twubric;

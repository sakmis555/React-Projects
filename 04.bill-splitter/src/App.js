import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const Header = () => {
  return (
    <div className="header">
      <h1>Bill Splitter</h1>
    </div>
  );
};
const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelection = (friend) => {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };
  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };
  return (
    <div>
      <Header />
      <div className="app-outer">
        <div className="app">
          <div className="sidebar">
            <FriendsList
              friends={friends}
              setFriends={setFriends}
              onSelection={handleSelection}
              selectedFriend={selectedFriend}
            />
            {showAddFriend && (
              <FormAddFriend
                friends={friends}
                setFriends={setFriends}
                setShowAddFriend={setShowAddFriend}
              />
            )}

            <button
              className="button"
              onClick={() => setShowAddFriend(!showAddFriend)}
            >
              {!showAddFriend ? "Add Friend" : "Close"}
            </button>
          </div>
          {selectedFriend && (
            <FormSplitBill
              selectedFriend={selectedFriend}
              onSplitBill={handleSplitBill}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default App;

const FriendItem = ({ friend, onSelection, selectedFriend }) => {
  // check for the selected item
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li key={friend.id} className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} Rs.
        </p>
      )}
      <button className="button" onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
};
const FriendsList = ({ friends, setFriends, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend, index) => {
        return (
          <FriendItem
            key={index}
            friend={friend}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        );
      })}
    </ul>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoPaid, setWhoPaid] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoPaid === "user" ? paidByFriend : -paidByUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name} </h2>
      <label>😶‍🌫️ Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🤦‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>😍 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>💀 Who is paying the bill</label>
      <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
        <option value="friend">{selectedFriend.name}</option>
        <option value="user">You</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
};

const FormAddFriend = ({ friends, setFriends, setShowAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleClick = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID;
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };
    console.log(id);
    setName("");
    setImage("https://i.pravatar.cc/48");
    setFriends([...friends, newFriend]);
    setShowAddFriend(false);
  };
  return (
    <form className="form-add-friend" onsubmit={(e) => console.log(e)}>
      <label>👨 Friend's Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>👌 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button" onClick={handleClick}>
        Add
      </button>
    </form>
  );
};

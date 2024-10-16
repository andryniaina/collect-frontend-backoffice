import React, { useState } from "react";
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the item type for dragging
const ItemTypes = {
  USER: "user",
};

// Define User type
interface User {
  _id: number;
  name: string;
}

// Define the item interface for dragging users
interface DragItem {
  user: User;
  type: string;
}

// Props for the DroppableList component
interface DroppableListProps {
  title: string;
  users: User[];
  onDropUser: (user: User, from: string) => void;
}

// Draggable User component
const UserComponent: React.FC<{ user: User; type: string }> = ({ user, type }) => {
  const [, drag] = useDrag<DragItem, void, unknown>({
    type: ItemTypes.USER,
    item: { user, type },
  });

  return (
    <div ref={drag} className="p-2 mb-2 bg-gray-200 rounded">
      {user.name}
    </div>
  );
};

// Droppable container for members and not-members
const DroppableList: React.FC<DroppableListProps> = ({ title, users, onDropUser }) => {
  const [, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemTypes.USER,
    drop: (item: DragItem) => {
      onDropUser(item.user, item.type);
    },
  });

  return (
    <div className="p-4 border rounded bg-white" ref={drop}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        users.map((user) => <UserComponent key={user._id} user={user} type={title} />)
      )}
    </div>
  );
};

const MembersComponent = ({users,setGroupMembers,initialMembers}:any) => {
  // Static data for initial not-members
  const initialNotMembers: User[] = users.filter((user:any)=>initialMembers.find((member:any)=>member._id===user._id)===undefined);

  const [members, setMembers] = useState<User[]>(initialMembers);
  const [notMembers, setNotMembers] = useState<User[]>(initialNotMembers);

  // Handle the logic when a user is dropped
  const handleDropUser = (user: User, from: string) => {
    if (from === "Not Members") {
      setNotMembers(notMembers.filter((u) => u._id !== user._id));
      setMembers([...members, user]);
      setGroupMembers([...members, user])
    } else if (from === "Members") {
      setMembers(members.filter((u) => u._id !== user._id));
      setNotMembers([...notMembers, user]);
      setGroupMembers(members.filter((u) => u._id !== user._id));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="grid grid-cols-2 gap-4">
      <DroppableList
        title="Members"
        users={members}
        onDropUser={handleDropUser}
      />
      <DroppableList
        title="Not Members"
        users={notMembers}
        onDropUser={handleDropUser}
      />
    </div>
    </DndProvider>
  );
};

export default MembersComponent;

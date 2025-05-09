const ToDo = require(".././models/toDoModel");

// Creating New Task
exports.createToDo = async (req, res) => {
  try {
    const data = req.body;
    // const { Title, Description, isCompleted, createdBy } = req.body;

    // const todo = new ToDo({
    //   Title,
    //   Description,
    //   isCompleted:
    //     typeof isCompleted === "boolean" ? isCompleted : isCompleted === "true",
    //   createdBy,
    // });
    const todo = new ToDo(data);
    const result = await todo.save();
    console.log(result);
    res.status(201).send({ message: "created New task" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Error" });
  }
};

//getting all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const todo = await ToDo.find({ createdBy: userId });
    if (todo.length === 0) {
      return res.status(404).send({ message: "No tasks found" });
    }
    res.status(200).send({ message: "you get all tasks", todo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error fetching tasks" });
  }
};

// deleting Existing Task
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const todo = await ToDo.findByIdAndDelete(id);
    console.log(todo);
    if (!todo)
      return res.status(404).send({ message: "The Task is not found" });
    res.status(201).send({ message: "The task deleted successfully!", todo });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Error" });
  }
};

// Updating Existing Task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const todo = await ToDo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!todo)
      return res.status(404).send({ message: "The Task is not found" });
    res
      .status(201)
      .send({ message: "The task is updated successfully!", todo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error updating the task!" });
  }
};

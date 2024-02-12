// eslint-disable-next-line react/prop-types
const SortFilterUsers = ({ setSortOption, sortOption }) => {
  return (
    <div className="flex-1 w-full flex justify-center">
      <select
        value={sortOption}
        onChange={e => setSortOption(e.target.value)}
        className="select select-accent  w-full max-w-none md:max-w-lg bg-transparent"
      >
        <option value="">Sort options</option>
        <option value="option1">Sort by name</option>
        <option value="option2">Sort by email</option>
        <option value="option3">Sort by Company name</option>
      </select>
    </div>
  );
};

export default SortFilterUsers;

const getResearchPapers = async () => {
  const res = await axios.get("http://localhost:5000/");
  console.log(res.data);
  return res.data;
};

getResearchPapers();

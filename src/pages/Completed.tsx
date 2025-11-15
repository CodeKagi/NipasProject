export default function Completed() {

      // mock items to display
  const items = [
    { id: "4518", applicant: "Thabo Jacob", type: "Hunt DCA - Lion", status: 'Completed' },
    { id: "9628", applicant: "Marie Peterson", type: "Hunt Dangerous Game", status: 'Completed' },
  ];
    return (


        <div>
            <h1 className="text-2xl font-bold text-[#3F842E] mb-4">Completed</h1>
            <p className="text-sm text-gray-600 mb-6">Showing sample items for <strong>Completed</strong>.</p>

            <div className="bg-white rounded shadow p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Application ID</th>
                            <th>Applicant</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((it) => (
                            <tr key={it.id} className="hover:bg-gray-50">
                                <td className="py-3 font-mono text-sm">{it.id}</td>
                                <td>{it.applicant}</td>
                                <td>{it.type}</td>
                                <td className="text-sm text-gray-700">{it.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

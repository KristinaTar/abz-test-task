1. Working with mockups ( HTML/CSS). You will find Figma project and source code here.
a. There is only one page with a deliberately minimized set of styles and components to keep the
test assignment as short as possible.
2. Working with REST API (GET). You will find API documentation (OpenAPI) here.
a. Implement the “Working with a GET request” block according to the mockup and API
documentation. Display 6 users on the API request result page. The "Show more" button
should be hidden when the last page of API query results is reached. Users are sorted by
registration date (the newest first).
b. To display radio buttons on the registration form, use the GET /positions method from the API
documentation.
3. Working with REST API (POST) – registration form block “Working with a POST Request”
a. Implement front-end validation in accordance with mockups and API documentation.
b. Implement the business logic of the registration form in accordance with mockups and API
documentation.
c. After successful registration, update the list of users in the “Working with a GET request” block.
If the “Show more” button has been clicked (i.e. more than one page of users has been loaded
from the API), collapse all and display only the first page of the result of the GET request. As a
result, the new user will be displayed first and you will be able to check the correctness of the
form without reloading the page.

mockups: https://www.figma.com/proto/ykJhQGVFGbQBEQZzuktwvm/TESTTASK---2022?page-id=581%3A0&node-id=3373%3A30897&viewport=358%2C48%2C0.04&scaling=min-zoom&starting-point-node-id=3373%3A30897&show-proto-sidebar=1
Figma project: https://www.figma.com/file/ykJhQGVFGbQBEQZzuktwvm/TESTTASK---2022?node-id=581%3A0
source: https://drive.google.com/drive/folders/1zh0no5kW_MCmfyO-0ojgvr5Oifn06YOt?usp=sharing
API: https://apidocs.abz.dev/test_assignment_for_frontend_developer_api_documentation
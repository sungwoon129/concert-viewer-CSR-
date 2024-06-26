## 공연 목록 뷰어 - CSR

다음 주에 전국에서 열리는 축제와 서울에서 열리는 미술 전시회 및 클래식공연들에 대한 정보를 목록화하여 확인할 수 있는 웹 어플리케이션입니다.
카테고리별로 구분하여 볼 수 있고, 무한 스크롤 방식으로 데이터를 호출하여 불필요한 데이터 호출을 최소화 하였습니다.

특정한 조건에 적합한 전시/공연 정보를 사용자에게 노출하는 기능을 가진 애플리케이션이기 때문에 API를 통해서 정보를 받아오고, 별도의 DB를 구성하지 않았습니다.
Next.js를 선택한 이유는 작고 구체적인 목표를 가진 애플리케이션이므로, 프론트와 백엔드를 JavaScript라는 하나의 언어로 빠르게 구현할 수 있고 프론트만 존재할 경우, CORS 문제로 API를 원활히 받아오기 어려울 것이라 생각해 CORS 문제를 프록시를 통해 우회할 수 있는 Next.js를 선택했습니다.

기능적으로는 대부분의 사용자가 '목록 -> 상세 -> 목록' 의 과정으로 사이트를 이용한다고 생각하여, API 호출 최소화 및 리렌더링 최소화 등 성능상의 이유와 API 요청 수의 제한을 고려해 로컬 스토리지에 목록을 저장해 다시 목록페이지로 돌아갔을 때 동일한 데이터를 다시 요청하지 않도록 했습니다.

API 호출 횟수나 호출하는 데이터의 크기에 신경을 쓴 이유는, API 제공 측에서 개발단계에서는 하루 최대 1000건의 데이터 호출만 가능하였기 때문입니다.

또한 SSR(Server Side Rendering)과 CSR(Clinet Side Rendering)의 구현과정에서의 차이를 경험해보기 위해 Next.js 에서 지원하는 CSR과 SSR 양쪽 모두 구현해보았으며, DB가 필요하지 않다는 점, 트래픽이 많지않고 이용시간이 길지 않을 것으로 예상된다는 점, 빠르게 개발해야하며 프론트단의 화면이 단순하다는 점등과, 검색을 통해 애플리케이션을 노출시키려는 목적이 없어 SEO와 같은 부분을 고려하지 않아도 된다고 판단하여 CSR로 구현한 버전만 GCP에 배포하였습니다.

## 개발 환경

- node v18.18.0
- npm 10.1.0
- Next.js 14.0.0
- IDE : Visual Studio Code
- Deploy : GCP

## GCP 배포 주소

현재는 비용상의 문제로 운영중이지 않습니다.

## Screen Shot

![image](https://github.com/sungwoon129/concert-viewer-CSR-/assets/43958570/eda0f446-48b5-4552-84b6-64c211eaa205)

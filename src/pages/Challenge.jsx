import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { supabase } from '../supabaseClient';
import scenarioImg1 from '../assets/1.png';
import scenarioImg2 from '../assets/2.png';
import scenarioImg3 from '../assets/3.png';
import scenarioImg4 from '../assets/4.png';
import scenarioImg5 from '../assets/5.png';
import scenarioImg6 from '../assets/6.png';
import scenarioImg7 from '../assets/7.png';
import scenarioImg8 from '../assets/8.png';
import scenarioImg9 from '../assets/9.png';
import scenarioImg10 from '../assets/10.png';

const scenarioImages = {
    1: scenarioImg1,
    2: scenarioImg2,
    3: scenarioImg3,
    4: scenarioImg4,
    5: scenarioImg5,
    6: scenarioImg6,
    7: scenarioImg7,
    8: scenarioImg8,
    9: scenarioImg9,
    10: scenarioImg10,
};

const days = [
    { day: 'Thứ Hai', title: 'Thử thách Cần' },
    { day: 'Thứ Ba', title: 'Thử thách Kiệm' },
    { day: 'Thứ Tư', title: 'Thử thách Liêm' },
    { day: 'Thứ Năm', title: 'Thử thách Chính' },
    { day: 'Thứ Sáu', title: 'Giao thoa chuẩn mực' },
];

const scenarios = [
    {
        id: 1,
        day: 'Thứ Hai',
        tag: 'can',
        tagLabel: 'Cần',
        timeLabel: 'Thứ Hai - 22:30',
        title: 'Đêm trước hạn chót: 30% chặng đường cuối',
        situation: 'Đã 22:30 đêm. Bạn đang cảm thấy hoàn toàn kiệt sức sau một ngày dài học tập trên trường và ca làm thêm buổi tối. Bài tập nhóm môn chuyên ngành quan trọng vẫn còn khoảng 30% khối lượng công việc chưa hoàn thành, và deadline nộp bài là 8:00 sáng mai. Bạn đang rất mệt mỏi, mắt ríu lại và khả năng tập trung giảm sút rõ rệt. Nhóm đang rất trông cậy vào phần việc của bạn.',
        visual: { gradient: 'from-[#002147] via-[#0b1220] to-[#1e2224]', icon: 'bedtime' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Đi ngủ ngay và tính tiếp vào sáng mai.',
                desc: 'Sức khỏe là trên hết. Bạn quyết định đi ngủ để nạp lại năng lượng. Sáng mai sẽ dậy thật sớm để cố gắng làm bù, hoặc nếu không kịp sẽ xin lỗi nhóm trưởng và nộp trễ phần của mình.',
                best: false,
                impact: { resources: { progress: -10, energy: 15, money: 0 }, traits: { can: -10 } },
                feedback: {
                    title: 'Rủi ro trì hoãn và thiếu trách nhiệm',
                    text: "Lựa chọn này có vẻ tốt cho sức khỏe ngắn hạn, nhưng lại tạo ra rủi ro lớn cho tập thể. Việc tự ý dời lịch và có nguy cơ nộp trễ làm ảnh hưởng đến tiến độ của cả nhóm. Chữ 'Cần' đòi hỏi sự nỗ lực và trách nhiệm hoàn thành công việc được giao.",
                    quote: 'Hiệu quả thực tế: Việc để dồn công việc vào phút chót thường dẫn đến chất lượng kém hoặc thất hứa.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Thức trắng đêm để hoàn thành bằng mọi giá.',
                desc: 'Trách nhiệm với nhóm là quan trọng nhất. Bạn pha một ly cà phê đậm, quyết tâm thức tới sáng để làm xong phần việc, chấp nhận ngày mai sẽ mệt mỏi khi đi học.',
                best: false,
                impact: { resources: { progress: 15, energy: -20, money: 0 }, traits: { can: -5 } },
                feedback: {
                    title: 'Nhiệt tình nhưng thiếu khoa học',
                    text: 'Bạn thể hiện tinh thần trách nhiệm cao độ với nhóm. Tuy nhiên, việc thức trắng đêm khi đã kiệt sức làm giảm nghiêm trọng hiệu suất làm việc, dễ dẫn đến sai sót. Hơn nữa, nó phá hủy sức khỏe và ảnh hưởng đến năng suất của những ngày tiếp theo.',
                    quote: 'Hiệu quả thực tế: Sự chăm chỉ mù quáng đôi khi mang lại tác dụng ngược. Cần mẫn phải đi đôi với phương pháp.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Lập lại kế hoạch và làm tập trung trong 90 phút.',
                desc: 'Đánh giá lại 30% công việc còn lại. Xác định những phần cốt lõi nhất và tập trung cao độ giải quyết chúng trong vòng 1 tiếng rưỡi tới. Sau đó sẽ đi ngủ để giữ sức, chấp nhận bài làm có thể không hoàn hảo 100% nhưng vẫn đảm bảo chất lượng cơ bản và đúng hạn.',
                best: true,
                impact: { resources: { progress: 10, energy: -5, money: 0 }, traits: { can: 25 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Cần mẫn và Thông minh',
                    text: "Đây là cách tiếp cận thể hiện rõ 'Hiệu quả thực tế'. Bạn không bỏ cuộc, cũng không bào mòn bản thân vô ích. Việc đánh giá lại ưu tiên, phân bổ thời gian giới hạn và tập trung giải quyết phần cốt lõi cho thấy tư duy giải quyết vấn đề sắc bén và sự nỗ lực (Cần) đúng chỗ.",
                    quote: 'Đạo đức qua hành động: Trách nhiệm không chỉ là làm cho xong, mà là làm hiệu quả nhất trong khả năng và nguồn lực cho phép.',
                },
            },
        ],
    },
    {
        id: 2,
        day: 'Thứ Hai',
        tag: 'can',
        tagLabel: 'Cần',
        timeLabel: 'Thứ Hai - 14:00',
        title: 'Seminar chuyên sâu hay ca làm thêm',
        situation: 'Chiều nay, khoa tổ chức một buổi seminar chuyên sâu với diễn giả là chuyên gia hàng đầu trong ngành — cơ hội hiếm có để mở rộng kiến thức và kết nối với những người có tầm ảnh hưởng. Nhưng đúng giờ đó, ca làm thêm tại quán cà phê đang chờ bạn, và khoản thu nhập ấy đang giúp bạn trang trải chi phí sinh hoạt. Đồng nghiệp của bạn hôm nay đã xin nghỉ, bạn biết mình đang rất cần tiền.',
        visual: { gradient: 'from-[#002147] to-[#465f88]', icon: 'event' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Bỏ seminar đi làm để giữ ca.',
                desc: 'Thu nhập là quan trọng nhất trước mắt. Bạn đi làm như thường lệ, tự nhủ kiến thức có thể học lại qua tài liệu, còn tiền thì không chờ ai.',
                best: false,
                impact: { resources: { progress: -5, energy: 5, money: 15 }, traits: { can: -15 } },
                feedback: {
                    title: 'Ưu tiên trước mắt nhưng đánh mất cơ hội dài hạn',
                    text: "Việc bỏ lỡ seminar không chỉ mất đi kiến thức chuyên sâu, mà còn là những mối quan hệ và cảm hứng mà buổi nói chuyện mang lại. 'Cần' là lao động có kế hoạch và đầu tư cho sự phát triển lâu dài, không phải chỉ chạy theo thu nhập trước mắt.",
                    quote: 'Hiệu quả thực tế: Đầu tư cho tri thức hôm nay là khoản sinh lời lớn nhất của tương lai.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Bỏ làm đi học nhưng tiếc tiền.',
                desc: 'Bạn vẫn quyết định dự seminar vì nhận thấy giá trị của nó, nhưng suốt buổi cứ nghĩ về số tiền đã mất và ca làm bị bỏ trống khiến đồng nghiệp phải gánh việc.',
                best: false,
                impact: { resources: { progress: 10, energy: -5, money: -10 }, traits: { can: 10 } },
                feedback: {
                    title: 'Đúng hướng nhưng còn tiếc nuối',
                    text: "Quyết định đi học là đúng đắn, nhưng sự tiếc nuối và lo lắng cho thấy bạn chưa giải quyết triệt để bài toán quản lý nguồn lực. 'Cần' kết hợp với kế hoạch sẽ giúp bạn vừa có kiến thức vừa không mất thu nhập.",
                    quote: "Cần là biết sắp xếp để 'cả hai đều thắng' thay vì 'được cái này mất cái kia'.",
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Sắp xếp lại lịch làm bù vào cuối tuần để dự seminar.',
                desc: 'Bạn chủ động trao đổi với quản lý, xin dời ca sang cuối tuần và nhờ đồng nghiệp hỗ trợ nếu cần. Bạn dự seminar trọn vẹn mà vẫn không mất thu nhập.',
                best: true,
                impact: { resources: { progress: 10, energy: -5, money: 0 }, traits: { can: 25 } },
                feedback: {
                    title: "Lựa chọn tối ưu: Xây dựng cái 'Tài' đi đôi với cái 'Đức'",
                    text: "Bạn không đánh đổi cái này lấy cái kia mà tìm cách dung hòa cả hai. Việc dự seminar đầu tư vào năng lực ('Tài'), trong khi vẫn đảm bảo trách nhiệm với công việc và thu nhập — đó là 'Cần' hiểu đúng nghĩa: lao động có kế hoạch, biết ưu tiên và sáng tạo trong cách sắp xếp.",
                    quote: "Xây dựng cái 'Tài' đi đôi với cái 'Đức' — hiệu quả thực tế đến từ kế hoạch thông minh.",
                },
            },
        ],
    },
    {
        id: 3,
        day: 'Thứ Ba',
        tag: 'kiem',
        tagLabel: 'Kiệm',
        timeLabel: 'Thứ Ba - 18:00',
        title: 'Deal hời 100k hay tiền in tài liệu',
        situation: 'Nhóm bạn thân rủ bạn đi ăn một quán mới khai trương với deal giảm giá rất hời: món ăn ngon chỉ 100.000đ. Nghe thật hấp dẫn — nhưng tuần này bạn đã lên kế hoạch dành khoản tiền đó để in tài liệu Project nhóm và phô-tô giáo trình. Ví tiền của bạn có hạn.',
        visual: { gradient: 'from-[#6e3900] to-[#fd8b00]', icon: 'restaurant' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Đi ăn vì "lâu lâu mới có".',
                desc: 'Đây là cơ hội hiếm có, bạn tự nhủ lâu lâu mới có một lần. Ngày mai bạn sẽ tính sau.',
                best: false,
                impact: { resources: { progress: 0, energy: 10, money: -100 }, traits: { kiem: -20 } },
                feedback: {
                    title: 'Tặc lưỡi cho qua dễ thành thói quen',
                    text: "Một lần 'tặc lưỡi' không đáng kể, nhưng nếu lặp lại thường xuyên, nó làm mất đi quỹ dành cho việc học. Kiệm không phải là keo kiệt, mà là biết tiết kiệm nguồn lực cho đúng mục đích quan trọng.",
                    quote: "Hiệu quả thực tế: Những khoản chi 'lâu lâu mới có' cộng dồn lại chính là thứ phá vỡ mọi kế hoạch tài chính.",
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Từ chối tuyệt đối.',
                desc: 'Bạn từ chối thẳng và về nhà, nhưng cảm thấy bị tách khỏi bạn bè và hơi tủi thân. Sự từ chối khô khan khiến bạn khó cân bằng giữa kỷ luật và các mối quan hệ.',
                best: false,
                impact: { resources: { progress: 0, energy: -10, money: 0 }, traits: { kiem: 10 } },
                feedback: {
                    title: 'Kiệm quá mức thành khắc khổ',
                    text: 'Tiết kiệm là tốt, nhưng từ chối tuyệt đối mọi cuộc vui khiến bạn trở nên khô khan và dễ đánh mất các mối quan hệ. Kiệm đúng nghĩa là tiêu dùng khôn ngoan, không phải bóp nghẹt bản thân.',
                    quote: 'Kiệm là thứ tiết kiệm có kế hoạch, không phải sự hà khắc với chính mình.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Ăn món vừa túi tiền để dành tiền in ấn.',
                desc: 'Bạn vẫn tham gia cuộc vui nhưng gọi món hợp lý trong khoảng ngân sách đã đặt ra, vui vẻ bên bạn bè mà không phá vỡ kế hoạch in tài liệu.',
                best: true,
                impact: { resources: { progress: 5, energy: 10, money: -30 }, traits: { kiem: 35 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Tiết kiệm nguồn lực một cách thông minh',
                    text: 'Bạn giữ được cả mối quan hệ lẫn kế hoạch tài chính. Kiệm không phải là không tiêu, mà là tiêu đúng chỗ, vừa đủ, có chủ đích. Đây chính là quản lý nguồn lực của người trưởng thành.',
                    quote: 'Kiệm là tiết kiệm của công lẫn của tư — biết chi cho giá trị thật, dừng lại trước cám dỗ nhất thời.',
                },
            },
        ],
    },
    {
        id: 4,
        day: 'Thứ Ba',
        tag: 'kiem',
        tagLabel: 'Kiệm',
        timeLabel: 'Thứ Ba - 21:45',
        title: 'Người cuối cùng rời phòng tự học',
        situation: 'Đã muộn, phòng tự học của thư viện trường dần vắng bóng người. Bạn là người cuối cùng đứng dậy rời đi. Đèn, quạt trần và máy điều hòa vẫn đang hoạt động hết công suất cho căn phòng trống trơn. Chẳng ai nhìn thấy bạn, chẳng ai biết bạn đã làm gì.',
        visual: { gradient: 'from-[#313030] via-[#1c1b1b] to-[#070b0d]', icon: 'lightbulb' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Để nguyên vì "tiền điện của trường".',
                desc: 'Đó là tiền của trường, của công, không phải của riêng bạn. Bạn chỉ cần rời đi cho đúng giờ là xong trách nhiệm.',
                best: false,
                impact: { resources: { progress: 0, energy: 0, money: -10 }, traits: { kiem: -20 } },
                feedback: {
                    title: 'Vô trách nhiệm với của công',
                    text: 'Của công cũng là tài sản chung do chính các bạn đóng góp xây dựng. Bỏ mặc thiết bị hoạt động lãng phí cả đêm vừa tốn kém vừa gây hại cho môi trường — và là sự lãng phí mà Kiệm không cho phép.',
                    quote: 'Hiệu quả thực tế: Tiền điện lãng phí của phòng học chính là tiền học phí của chính bạn.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Chỉ tắt đèn chỗ mình ngồi.',
                desc: 'Bạn tắt đèn khu vực mình ngồi rồi ra về, tự cho rằng mình đã làm đủ phần việc của mình.',
                best: false,
                impact: { resources: { progress: 0, energy: 0, money: -5 }, traits: { kiem: 5 } },
                feedback: {
                    title: 'Làm qua loa, hiệu quả thấp',
                    text: 'Tắt đèn khu vực mình ngồi là tốt, nhưng nửa vời: các thiết bị khác vẫn lãng phí. Kiệm đòi hỏi cái nhìn toàn cục — tiết kiệm cho cả của công lẫn của tư, không chỉ cho riêng mình.',
                    quote: 'Kiệm nửa vời là tiết kiệm ít hiệu quả — hãy nghĩ đến lợi ích chung.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Tắt toàn bộ thiết bị điện không cần thiết.',
                desc: 'Bạn dành một phút tắt toàn bộ đèn, quạt và điều hòa của phòng trước khi rời đi. Thói quen nhỏ nhưng thể hiện trách nhiệm với của chung.',
                best: true,
                impact: { resources: { progress: 5, energy: 5, money: 5 }, traits: { kiem: 35 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Kiệm là tiết kiệm của công lẫn của tư',
                    text: 'Hành động nhỏ nhưng thể hiện tư duy làm chủ của công như của tư. Người Kiệm không chỉ biết tiết kiệm cho bản thân mà còn biết gìn giữ tài sản chung — một phẩm chất lãnh đạo quý giá.',
                    quote: 'Kiệm là tiết kiệm của công lẫn của tư — làm chủ tập thể từ những hành động nhỏ.',
                },
            },
        ],
    },
    {
        id: 5,
        day: 'Thứ Tư',
        tag: 'liem',
        tagLabel: 'Liêm',
        timeLabel: 'Thứ Tư - 23:00',
        title: 'Đoạn code giải quyết 100% assignment',
        situation: 'Deadline bài tập lập trình đang cận kề, và bạn tình cờ tìm thấy trên GitHub một đoạn code giải quyết gần như 100% yêu cầu assignment. Không ai biết bạn copy, không có công cụ nào đủ mạnh để phát hiện nếu bạn khéo léo một chút. Bạn chỉ cần sửa tên biến và nộp.',
        visual: { gradient: 'from-[#001b3d] to-[#465f88]', icon: 'terminal' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Copy nguyên văn.',
                desc: 'Bạn tải về và nộp nguyên xi, nghĩ rằng ai cũng làm vậy, và deadline quá gấp.',
                best: false,
                impact: { resources: { progress: 15, energy: 5, money: 0 }, traits: { liem: -30 } },
                feedback: {
                    title: 'Đạo văn trắng trợn, vi phạm nghiêm trọng',
                    text: 'Copy nguyên văn là hành vi đạo văn (plagiarism) — vi phạm nghiêm trọng nhất của liêm chính học thuật. Dù không bị phát hiện ngay, nó đánh mất cơ hội học tập của chính bạn và để lại vết nhơ học thuật khi bị kiểm tra.',
                    quote: 'Hiệu quả thực tế: Kiến thức không bao giờ thuộc về kẻ lười đi đường tắt.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Sửa tên biến để qua mặt tool check.',
                desc: 'Bạn biến đổi nhẹ để qua mắt công cụ kiểm tra đạo văn, tự trấn an rằng mình đã cải tiến.',
                best: false,
                impact: { resources: { progress: 15, energy: 0, money: 0 }, traits: { liem: -15 } },
                feedback: {
                    title: 'Tinh vi hơn nhưng bản chất vẫn là gian lận',
                    text: 'Sửa tên biến, thay đổi cấu trúc bề ngoài không thay đổi bản chất: ý tưởng và công sức vẫn là của người khác. Liêm không chấp nhận sự gian lận dưới bất kỳ hình thức đội lốt nào.',
                    quote: 'Liêm là giữ sự trong sạch kể cả khi không ai nhìn thấy.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Đọc hiểu logic và tự code lại.',
                desc: 'Bạn dùng đoạn code như tài liệu tham khảo, đọc hiểu từng logic, rồi tự tay code lại theo cách hiểu của mình và ghi nguồn tham khảo rõ ràng.',
                best: true,
                impact: { resources: { progress: 10, energy: -10, money: 0 }, traits: { liem: 40 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Liêm chính học thuật',
                    text: 'Bạn biến nguồn tham khảo thành bài học thật sự của mình. Việc tự code lại không chỉ giúp bạn hiểu sâu mà còn giữ vững tính Liêm — trung thực trong từng sản phẩm học tập. Đây là cách mượn sức mạnh của người khác để tự mình vươn lên.',
                    quote: 'Liêm là không tham công sức của người khác — mượn tri thức để tự lực, không mượn sản phẩm để đối phó.',
                },
            },
        ],
    },
    {
        id: 6,
        day: 'Thứ Tư',
        tag: 'liem',
        tagLabel: 'Liêm',
        timeLabel: 'Thứ Tư - 12:30',
        title: '50.000đ thối nhầm ở canteen',
        situation: 'Giờ nghỉ trưa, bạn đang đói cồn cào và mua một bữa ăn ở canteen. Cô thu ngân vội vàng thối nhầm cho bạn nhiều hơn 50.000đ. Xung quanh đông đúc, không ai để ý. Số tiền ấy đúng bằng một bữa ăn ngon hơn mà bạn đang thèm.',
        visual: { gradient: 'from-[#603100] to-[#904d00]', icon: 'account_balance_wallet' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Lấy luôn vì "lỗi của họ".',
                desc: 'Đó là lỗi của cô thu ngân, không phải của bạn. Bạn cất tiền đi và coi như được lộc.',
                best: false,
                impact: { resources: { progress: 0, energy: 5, money: 10 }, traits: { liem: -30 } },
                feedback: {
                    title: 'Chiếm dụng tài sản người khác',
                    text: "Dù là lỗi của cô thu ngân, khoản tiền đó không thuộc về bạn. Giữ nó là chiếm đoạt tài sản của người khác dưới danh nghĩa 'lộc trời cho'. Liêm là không tham, kể cả khi không ai phát hiện.",
                    quote: 'Hiệu quả thực tế: Của không phải của mình, giữ là mang nợ — nợ tiền lẫn nợ lương tâm.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Phân vân rồi cất đi.',
                desc: 'Bạn đứng đó phân vân vài giây, rồi quyết định cất vào ví, tự hứa lần sau sẽ không thế nữa.',
                best: false,
                impact: { resources: { progress: 0, energy: -5, money: 10 }, traits: { liem: -10 } },
                feedback: {
                    title: 'Do dự nhưng vẫn chọn sai',
                    text: 'Sự phân vân cho thấy bạn biết điều đó là sai, nhưng việc vẫn cất tiền khiến bạn mang cảm giác tội lỗi và bắt đầu quen với việc nhắm mắt trước cám dỗ. Liêm đòi hỏi dứt khoát ngay trong suy nghĩ.',
                    quote: 'Khi lương tâm đã nhắc nhở mà ta vẫn làm, đó là lúc đạo đức bắt đầu lung lay.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Trả lại ngay lập tức.',
                desc: 'Bạn gọi cô thu ngân lại và trả lại số tiền thối nhầm. Cô cảm ơn bạn với ánh mắt biết ơn, và bạn ra về với bữa ăn thanh thản.',
                best: true,
                impact: { resources: { progress: 5, energy: 5, money: -5 }, traits: { liem: 40 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Liêm là không tham tiền tài',
                    text: 'Bạn giữ vững sự trong sạch ngay cả khi không ai nhìn thấy. Hành động nhỏ này không chỉ cứu cô thu ngân khỏi thiếu quỹ mà còn giúp bạn xây dựng lòng tự trọng và danh dự — tài sản quý giá nhất.',
                    quote: 'Liêm là không tham tiền tài, địa vị — sự thanh thản không thể mua được bằng 50.000đ.',
                },
            },
        ],
    },
    {
        id: 7,
        day: 'Thứ Năm',
        tag: 'chinh',
        tagLabel: 'Chính',
        timeLabel: 'Thứ Năm - 20:00',
        title: 'Bạn thân chưa làm phần việc nhóm',
        situation: 'Bạn là người tổng hợp Project nhóm. Ngày mai là hạn nộp, và bạn nhận ra Nam — người bạn thân nhất của bạn — chưa hề làm phần việc được giao dù đã hứa ba lần. Viết tên Nam vào báo cáo là điều dễ dàng, còn phê bình người bạn thân thì khó hơn nhiều.',
        visual: { gradient: 'from-[#43474a] to-[#1c1b1b]', icon: 'group' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Bao che, ghi Nam làm đủ.',
                desc: 'Nam là bạn thân, bạn không muốn làm mất lòng. Bạn tự viết giúp phần của Nam và ghi tên cậu ấy như đã hoàn thành.',
                best: false,
                impact: { resources: { progress: 15, energy: 5, money: 0 }, traits: { chinh: -20 } },
                feedback: {
                    title: 'Tình riêng che lấp việc chung',
                    text: 'Bao che cho Nam khiến cậu ấy không bao giờ học được tinh thần trách nhiệm, đồng thời bạn đang gian lận cho cả nhóm. Chính nghĩa là đặt việc công lên trên tình riêng, kể cả với người thân thiết.',
                    quote: 'Hiệu quả thực tế: Bao che hôm nay là đang hại bạn mình ngày mai.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Xóa tên Nam ngay.',
                desc: 'Tức giận, bạn xóa tên Nam khỏi danh sách thành viên và nộp bài không có cậu ấy, dù không nói chuyện thẳng với Nam.',
                best: false,
                impact: { resources: { progress: 10, energy: -10, money: 0 }, traits: { chinh: 5 } },
                feedback: {
                    title: 'Đúng nguyên tắc nhưng thiếu tình người',
                    text: 'Xóa tên là hậu quả mà Nam đáng phải nhận, nhưng làm việc đó trong âm thầm, không cho Nam cơ hội sửa sai, khiến bạn trở nên cứng nhắc và mất đi người bạn. Chính đi đôi với khéo léo và công bằng.',
                    quote: 'Chính trực không có nghĩa là khô khan — thẳng thắn cần đi cùng sự cảm thông.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Thẳng thắn phê bình và yêu cầu Nam hoàn thành phần tối thiểu.',
                desc: 'Bạn gọi Nam nói chuyện thẳng thắn, chỉ rõ trách nhiệm của cậu ấy và yêu cầu hoàn thành phần tối thiểu trước sáng mai, đồng thời rút ra bài học về kỷ luật nhóm.',
                best: true,
                impact: { resources: { progress: 10, energy: -5, money: 0 }, traits: { chinh: 35 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Việc công trên việc tư',
                    text: 'Bạn vừa giữ nguyên tắc vừa cho bạn mình cơ hội sửa sai. Sự thẳng thắn có thể khiến Nam khó chịu lúc đầu, nhưng về lâu dài nó giúp cậu ấy trưởng thành và là thứ giữ tình bạn thật sự — một tình bạn dựa trên sự tôn trọng lẫn nhau.',
                    quote: 'Chính là việc công trên việc tư — phê bình đúng lúc chính là cách yêu thương bạn đúng cách.',
                },
            },
        ],
    },
    {
        id: 8,
        day: 'Thứ Năm',
        tag: 'chinh',
        tagLabel: 'Chính',
        timeLabel: 'Thứ Năm - 19:30',
        title: 'Quỹ CLB chi tiêu không minh bạch',
        situation: 'Trong vai trò thành viên Ban truyền thông của một CLB, bạn tình cờ phát hiện các khoản chi quỹ CLB gần đây không có hóa đơn rõ ràng và nghi vấn một số tiền bị sử dụng sai mục đích. Bạn là người duy nhất nhận ra điều này.',
        visual: { gradient: 'from-[#002147] to-[#0b1220]', icon: 'account_balance' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Giữ im lặng để không phiền phức.',
                desc: 'Không liên quan đến mình, bạn tự nhủ im lặng là vàng để tránh rắc rối và thù hằn.',
                best: false,
                impact: { resources: { progress: 0, energy: 5, money: 0 }, traits: { chinh: -20 } },
                feedback: {
                    title: 'Im lặng là tiếp tay cho sai phạm',
                    text: 'Im lặng trước dấu hiệu sai phạm trong tập thể khiến kẻ xấu có cơ hội lớn hơn. Chính nghĩa đòi hỏi dũng khí lên tiếng bảo vệ lẽ phải và tài sản chung, dù điều đó có thể khiến bạn khó xử.',
                    quote: 'Cái ác chỉ lớn lên nhờ sự im lặng của người tốt.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Rời CLB trong im lặng.',
                desc: 'Bạn quyết định rời CLB để sạch thân, nghĩ rằng tránh xa là cách tốt nhất.',
                best: false,
                impact: { resources: { progress: -5, energy: 5, money: 0 }, traits: { chinh: 0 } },
                feedback: {
                    title: 'Trốn tránh thay vì đối diện',
                    text: 'Rời đi khiến bạn thoát khỏi rắc rối trước mắt, nhưng đồng nghĩa với việc bỏ mặc tập thể đang đi sai hướng và để kẻ xấu tiếp tục. Người Chính không bỏ chạy khi chứng kiến điều sai trái.',
                    quote: 'Hiệu quả thực tế: Tránh xa không sửa được sai — sự đúng đắn cần được bảo vệ, không phải được trốn tránh.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Yêu cầu Ban điều hành công khai tài chính trong buổi họp.',
                desc: 'Bạn chuẩn bị số liệu và trình bày vấn đề trước cuộc họp CLB, yêu cầu Ban điều hành giải trình công khai các khoản chi, đồng thời đề xuất quy chế minh bạch tài chính cho CLB.',
                best: true,
                impact: { resources: { progress: 5, energy: -10, money: 0 }, traits: { chinh: 35 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Chính là thẳng thắn bảo vệ lẽ phải',
                    text: 'Bạn dũng cảm lên tiếng đúng nơi, đúng lúc, đúng cách: có dữ liệu, có đề xuất cụ thể, vì lợi ích chung chứ không vì cá nhân. Đây chính là tinh thần Chính — bảo vệ lẽ phải và thúc đẩy sự minh bạch, trách nhiệm giải trình trong tập thể.',
                    quote: 'Chính là thẳng thắn bảo vệ lẽ phải — dám nói đúng, đủ và vì lợi ích chung.',
                },
            },
        ],
    },
    {
        id: 9,
        day: 'Thứ Sáu',
        tag: 'giao',
        tagLabel: 'Giao thoa',
        timeLabel: 'Thứ Sáu - 07:00',
        title: '1 tiếng trước deadline: lỗi nhỏ nhưng khó sửa',
        situation: 'Còn đúng 1 tiếng nữa là đến hạn nộp Project lớn. Nhóm vừa phát hiện một lỗi kỹ thuật tuy nhỏ nhưng rất khó sửa — và nó khiến kết quả hiển thị sai. Một số thành viên mệt mỏi sau đêm thức trắng, đề nghị nộp luôn cho xong, chấp nhận lỗi nhỏ. Bạn là người rành kỹ thuật nhất trong nhóm.',
        visual: { gradient: 'from-[#1c1b1b] to-[#74777f]', icon: 'bug_report' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Đồng ý nộp để đi ngủ.',
                desc: 'Mọi người đã kiệt sức, lỗi thì nhỏ. Bạn đồng ý nộp bài kèm ghi chú lỗi để ai cũng được nghỉ.',
                best: false,
                impact: { resources: { progress: 5, energy: 15, money: 0 }, traits: { can: -10, chinh: -10 } },
                feedback: {
                    title: 'Chấp nhận kém hoàn hảo vì mệt mỏi',
                    text: 'Hiểu được sự mệt mỏi, nhưng nộp sản phẩm có lỗi biết trước là thiếu trách nhiệm với chính thành quả của cả nhóm. Hiệu quả thực tế đòi hỏi không ngừng nâng cao chất lượng đến phút cuối khi còn khả năng.',
                    quote: 'Cần mẫn đúng nghĩa là làm tới cùng khi còn thời gian, không dừng lại giữa chừng.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Một mình thức sửa lỗi.',
                desc: 'Bạn bảo mọi người đi nghỉ, một mình cắm đầu sửa lỗi tới sát giờ nộp. Có thể kịp, nhưng bạn kiệt sức và một mình gánh hết trách nhiệm.',
                best: false,
                impact: { resources: { progress: 10, energy: -15, money: 0 }, traits: { can: 10, kiem: -10 } },
                feedback: {
                    title: 'Tinh thần cao nhưng cách làm kém hiệu quả',
                    text: "Việc một mình gánh hết cho thấy tinh thần trách nhiệm, nhưng phân công không hợp lý: một người sửa khó có thể nhanh và chuẩn bằng cả nhóm phối hợp. 'Cần' phải đi cùng 'phương pháp' để tạo hiệu quả thực tế tốt nhất.",
                    quote: 'Cần mẫn mà thiếu phương pháp là lao động lãng phí sức lực.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Phân công nhanh cả nhóm cùng xử lý để đạt hiệu quả thực tế tốt nhất.',
                desc: 'Bạn chia nhỏ lỗi thành từng phần, phân công mỗi người một mảng, cùng nhau xử lý trong 45 phút và dành 15 phút cuối kiểm tra tổng thể trước khi nộp.',
                best: true,
                impact: { resources: { progress: 15, energy: -5, money: 0 }, traits: { can: 50, kiem: 30, chinh: 15 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Giao thoa các chuẩn mực trong hành động',
                    text: 'Bạn kết hợp Cần (nỗ lực đến cùng), Kiệm (không lãng phí sức lực của ai), Chính (trách nhiệm với chất lượng sản phẩm chung). Việc phân công khoa học giúp cả nhóm đạt hiệu quả thực tế tốt nhất trong khoảng thời gian giới hạn.',
                    quote: 'Đạo đức trong hành động là khi các chuẩn mực được vận dụng đồng bộ vì mục tiêu chung.',
                },
            },
        ],
    },
    {
        id: 10,
        day: 'Thứ Sáu',
        tag: 'giao',
        tagLabel: 'Giao thoa',
        timeLabel: 'Thứ Sáu - 21:00',
        title: 'Lời mời thực tập danh giá hay dự án cộng đồng',
        situation: 'Bạn vừa nhận hai lời đề nghị song song. Một là vị trí thực tập tại một công ty lớn — hồ sơ nghe rất đẹp, nhưng thực chất chỉ là chân chạy vặt, ít được học hỏi thật. Hai là một dự án cộng đồng vất vả, không danh tiếng, nhưng bạn được làm việc thật, được thử thách và cống hiến.',
        visual: { gradient: 'from-[#002147] via-[#2f1500] to-[#fd8b00]', icon: 'volunteer_activism' },
        options: [
            {
                id: 1,
                letter: 'A',
                title: 'Chọn công ty lớn để lấy danh.',
                desc: 'Tên tuổi công ty sẽ đẹp trong hồ sơ xin việc sau này. Bạn nghĩ học chậm cũng được, quan trọng là tên tuổi.',
                best: false,
                impact: { resources: { progress: 5, energy: 5, money: 10 }, traits: { liem: -20 } },
                feedback: {
                    title: 'Tham danh — vi phạm Liêm',
                    text: 'Chọn hào nhoáng bên ngoài thay vì giá trị thật là tham danh hão. Danh tiếng chỉ bền vững khi đi cùng thực lực; làm chân chạy vặt mà không học được gì sẽ khiến bạn rỗng ruột khi đối mặt với thử thách thật.',
                    quote: 'Tham danh là đánh mất chính mình — hiệu quả thực tế mới là thước đo cuối cùng.',
                },
            },
            {
                id: 2,
                letter: 'B',
                title: 'Không chọn cái nào.',
                desc: 'Bạn phân vân, sợ sai, và quyết định không chọn gì cả, chờ cơ hội hoàn hảo khác.',
                best: false,
                impact: { resources: { progress: -10, energy: 0, money: 0 }, traits: { can: -10 } },
                feedback: {
                    title: 'Do dự làm lỡ mất cơ hội',
                    text: 'Đứng yên vì sợ chọn sai là lựa chọn an toàn nhất cũng là lựa chọn vô giá trị nhất. Cơ hội không chờ người do dự, và sự trưởng thành đến từ việc dám quyết định và chịu trách nhiệm với quyết định của mình.',
                    quote: 'Không chọn cũng là một sự chọn — và thường là sự chọn kém nhất.',
                },
            },
            {
                id: 3,
                letter: 'C',
                title: 'Chọn dự án cộng đồng để rèn luyện.',
                desc: 'Bạn chọn dự án cộng đồng dù vất vả, vì biết đó là nơi mình thực sự học được nghề, rèn được bản lĩnh và tạo ra giá trị thật cho người khác.',
                best: true,
                impact: { resources: { progress: 10, energy: -10, money: -5 }, traits: { liem: 20, chinh: 15 } },
                feedback: {
                    title: 'Lựa chọn tối ưu: Lấy hiệu quả thực tế làm thước đo',
                    text: "Bạn nhìn đúng bản chất: giá trị của cơ hội nằm ở điều bạn học được và tạo ra, không nằm ở cái tên. Vừa rèn được 'Tài' (năng lực thật) vừa giữ được 'Đức' (phục vụ cộng đồng) — đây là sự giao thoa trọn vẹn của Liêm và Chính trong quyết định nghề nghiệp.",
                    quote: 'Lấy hiệu quả thực tế làm thước đo — rèn Tài đi đôi với vun Đức.',
                },
            },
        ],
    },
];

const getResultMessage = (bestCount) => {
    if (bestCount >= 8) {
        return 'Xuất sắc! Bạn đã vận dụng nhuần nhuyễn các chuẩn mực Cần - Kiệm - Liêm - Chính trong mọi tình huống. Đạo đức của bạn không chỉ nằm trong nhận thức mà đã trở thành hành động thực tế.';
    }
    if (bestCount >= 5) {
        return 'Khá tốt! Phần lớn quyết định của bạn đều đi đúng hướng và mang lại hiệu quả thực tế. Hãy xem lại những tình huống chưa tối ưu để hiểu thêm cách dung hòa các chuẩn mực.';
    }
    return 'Hành trình đạo đức là một quá trình rèn luyện, đừng nản lòng! Hãy đọc lại phần phân tích của Cố vấn để hiểu vì sao mỗi lựa chọn lại dẫn đến những kết quả khác nhau, rồi thử lại một lần nữa nhé.';
};

const getPrimaryTitle = (bestCount) => {
    if (bestCount >= 8) return 'NGƯỜI GIỮ NGUYÊN TẮC';
    if (bestCount >= 5) return 'NGƯỜI RÈN LUYỆN';
    return 'NGƯỜI HỌC VIỆC';
};

const INITIAL_GAME_STATE = {
    resources: { progress: 0, energy: 100, money: 320000 },
    traits: { can: 100, kiem: 100, liem: 100, chinh: 100 },
};

const RESOURCE_LIMITS = {
    progress: [0, 100],
    energy: [0, 100],
    money: [0, 999999],
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const loadInitialGameState = () => {
    try {
        const saved = localStorage.getItem('game_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.traits) {
                // Tự động nâng cấp các traits cũ khởi đầu từ 0 sang 100
                const allZero = Object.values(parsed.traits).every((v) => v === 0);
                if (allZero) {
                    parsed.traits = { can: 100, kiem: 100, liem: 100, chinh: 100 };
                }
            }
            return parsed;
        }
    } catch (err) {
        console.error('Không đọc được game_state từ localStorage:', err);
    }
    return INITIAL_GAME_STATE;
};

const applyImpact = (state, option) => {
    const next = {
        resources: { ...state.resources },
        traits: { ...state.traits },
    };
    Object.entries(option.impact.resources).forEach(([key, value]) => {
        const [min, max] = RESOURCE_LIMITS[key] ?? [0, 999999];
        // Nhân 1000 với tiền để khớp với đơn vị hàng nghìn (VD: -15 -> -15000 VNĐ)
        const actualValue = key === 'money' ? value * 1000 : value;
        next.resources[key] = clamp((next.resources[key] ?? 0) + actualValue, min, max);
    });
    Object.entries(option.impact.traits).forEach(([key, value]) => {
        // Bắt đầu từ 100 rồi cộng giá trị impact (impact âm sẽ tự động trừ đi, impact dương cộng lại tối đa 100)
        next.traits[key] = clamp((next.traits[key] ?? 100) + value, 0, 100);
    });
    return next;
};

const buildHiddenAchievements = (scenarios, answers, state) => {
    const achievements = [];
    
    const isBest = (id) => {
        const s = scenarios.find((x) => x.id === id);
        if (!s) return false;
        const bestOpt = s.options.find((o) => o.best);
        return answers[id] === (bestOpt ? bestOpt.id : null);
    };

    // 1. Ánh Sáng Trong Bóng Tối (Liêm): Cần chọn tốt nhất ở Scenario 5, 6 và 10
    if (isBest(5) && isBest(6) && isBest(10)) {
        achievements.push('Ánh Sáng Trong Bóng Tối');
    }

    // 2. Deadline Slayer (Cần): Cần chọn tốt nhất ở Scenario 1, 2 và 9
    if (isBest(1) && isBest(2) && isBest(9)) {
        achievements.push('Deadline Slayer');
    }

    // 3. Không Ai Biết (Chính): Cần chọn tốt nhất ở Scenario 7, 8, 9 và 10
    if (isBest(7) && isBest(8) && isBest(9) && isBest(10)) {
        achievements.push('Không Ai Biết');
    }

    // 4. Không Một Xu Lãng Phí (Kiệm): Cần chọn tốt nhất ở Scenario 3, 4 và 9
    if (isBest(3) && isBest(4) && isBest(9)) {
        achievements.push('Không Một Xu Lãng Phí');
    }

    // 5. Bậc Thầy Cân Bằng (Năng lượng >= 70% và Tiến độ >= 70%)
    if (state && state.resources && state.resources.energy >= 70 && state.resources.progress >= 70) {
        achievements.push('Bậc Thầy Cân Bằng');
    }

    // 6. Nhà Quản Lý Tài Ba (Tài chính >= 300.000 VNĐ)
    if (state && state.resources && state.resources.money >= 300000) {
        achievements.push('Nhà Quản Lý Tài Ba');
    }

    // 7. Chiến Thần Vượt Khó (Năng lượng <= 15% hoặc Tài chính <= 50.000 VNĐ, Tiến độ >= 80%)
    if (state && state.resources && (state.resources.energy <= 15 || state.resources.money <= 50000) && state.resources.progress >= 80) {
        achievements.push('Chiến Thần Vượt Khó');
    }

    // 8. Chiến Lược Gia Hiệu Suất (Tiến độ >= 100%)
    if (state && state.resources && state.resources.progress >= 100) {
        achievements.push('Chiến Lược Gia Hiệu Suất');
    }

    return achievements;
};

const buildDecisions = (scenarios, answers) =>
    scenarios.map((s) => {
        const bestId = s.options.find((o) => o.best).id;
        const chosenId = answers[s.id] ?? null;
        const chosen = chosenId ? s.options.find((o) => o.id === chosenId) : null;
        return {
            scenario_id: s.id,
            day: s.day,
            tag: s.tag,
            tag_label: s.tagLabel,
            title: s.title,
            selected_option: chosenId,
            selected_option_letter: chosen ? chosen.letter : null,
            selected_option_title: chosen ? chosen.title : null,
            feedback_title: chosen ? chosen.feedback.title : null,
            is_best: chosenId === bestId,
        };
    });

const Challenge = () => {
    const navigate = useNavigate();
    const studentName = localStorage.getItem('student_name') || 'Minh';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [gameState, setGameState] = useState(loadInitialGameState);
    const [finished, setFinished] = useState(false);
    const [showCurtain, setShowCurtain] = useState(true);
    const [isCurtainUp, setIsCurtainUp] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [isClosingTutorial, setIsClosingTutorial] = useState(false);
    const feedbackRef = useRef(null);

    const handleOpenTutorial = () => {
        setIsClosingTutorial(false);
        setShowTutorial(true);
    };

    const handleCloseTutorial = () => {
        setIsClosingTutorial(true);
        setTimeout(() => {
            setShowTutorial(false);
            setIsClosingTutorial(false);
        }, 280);
    };

    const scenario = scenarios[currentIndex];
    const dayIndex = Math.floor((scenario.id - 1) / 2);

    const bestCount = scenarios.reduce((sum, s) => {
        const bestId = s.options.find((o) => o.best).id;
        return answers[s.id] === bestId ? sum + 1 : sum;
    }, 0);
    const weekProgress = gameState.resources.progress;

    const selected = answers[scenario.id];
    const selectedOption = selected ? scenario.options.find((o) => o.id === selected) : null;

    const selectOption = (optionId) => {
        if (answers[scenario.id]) return;
        const option = scenario.options.find((o) => o.id === optionId);
        setAnswers((prev) => ({ ...prev, [scenario.id]: optionId }));
        setGameState((state) => applyImpact(state, option));
    };

    useEffect(() => {
        // Trigger curtain transition
        const timer1 = setTimeout(() => {
            setIsCurtainUp(true);
        }, 50);

        const timer2 = setTimeout(() => {
            setShowCurtain(false);
            setShowTutorial(true);
        }, 1100);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        if (selected && feedbackRef.current) {
            feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [selected]);

    useEffect(() => {
        try {
            localStorage.setItem('game_state', JSON.stringify(gameState));
        } catch (err) {
            console.error('Không lưu được game_state vào localStorage:', err);
        }
    }, [gameState]);

    const saveGameSessionToSupabase = async () => {
        try {
            const finalGameState = {
                studentName,
                resources: {
                    progress: gameState.resources.progress,
                    energy: gameState.resources.energy,
                    money: gameState.resources.money,
                },
                traits: {
                    can: gameState.traits.can,
                    kiem: gameState.traits.kiem,
                    liem: gameState.traits.liem,
                    chinh: gameState.traits.chinh,
                },
                primaryTitle: getPrimaryTitle(bestCount),
                hiddenAchievements: buildHiddenAchievements(scenarios, answers, gameState),
                decisions: buildDecisions(scenarios, answers),
            };

            localStorage.setItem('game_result', JSON.stringify(finalGameState));

            if (!supabase) {
                console.warn('Supabase chưa được cấu hình, bỏ qua lưu lên DB.');
                return false;
            }

            const payload = {
                student_name: finalGameState.studentName,
                progress: finalGameState.resources.progress,
                energy: finalGameState.resources.energy,
                money: finalGameState.resources.money,
                trait_can: finalGameState.traits.can,
                trait_kiem: finalGameState.traits.kiem,
                trait_liem: finalGameState.traits.liem,
                trait_chinh: finalGameState.traits.chinh,
                primary_title: finalGameState.primaryTitle,
                hidden_achievements: finalGameState.hiddenAchievements,
                decisions: finalGameState.decisions,
            };

            const sessionId = localStorage.getItem('session_id');
            let data, error;

            if (sessionId) {
                // Đã có phiên chơi (từ trang Đăng ký), tiến hành cập nhật
                const response = await supabase
                    .from('game_sessions')
                    .update(payload)
                    .eq('id', sessionId)
                    .select();
                data = response.data;
                error = response.error;
            } else {
                // Nếu chơi trực tiếp không qua trang Đăng ký thì tạo mới
                const response = await supabase
                    .from('game_sessions')
                    .insert([payload])
                    .select();
                data = response.data;
                error = response.error;
            }

            if (error) {
                console.error('Lỗi khi lưu dữ liệu lên Supabase:', error);
                return false;
            }
            console.log('Đã lưu thành công!', data);
            return true;
        } catch (err) {
            console.error('Đã xảy ra lỗi:', err);
            return false;
        }
    };

    const goNext = async () => {
        if (currentIndex < scenarios.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (!saving) {
                setSaving(true);
                await saveGameSessionToSupabase();
                navigate('/result');
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const restart = () => {
        setAnswers({});
        setGameState(INITIAL_GAME_STATE);
        setCurrentIndex(0);
        setFinished(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-background text-on-background antialiased min-h-screen flex flex-col font-body-md text-body-md relative overflow-hidden">
            {showCurtain && (
                <div className="fixed inset-0 z-[100] pointer-events-none select-none">
                    {/* Orange layer - slides up second (has delay) */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-secondary-container z-10 ${isCurtainUp ? 'curtain-up-back' : ''
                            }`}
                    ></div>
                    {/* Navy layer - slides up first (no delay) */}
                    <div
                        className={`curtain-layer absolute inset-0 bg-primary-container z-20 shadow-2xl flex items-center justify-center ${isCurtainUp ? 'curtain-up-main' : ''
                            }`}
                    >
                        <div className="text-on-primary font-headline-md text-xl tracking-wider animate-pulse">
                            Đang mở thử thách...
                        </div>
                    </div>
                </div>
            )}
            <Header />
            <main className="page-entrance flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col md:flex-row gap-gutter">
                {/* Sidebar Progress & Stats */}
                <aside className="w-full md:w-1/4 flex flex-col gap-8 hidden md:flex">
                    {/* Character Stats */}
                    <div className="p-6 bg-surface-container-low border border-outline-variant rounded flex flex-col gap-4">
                        <div className="flex items-center gap-4 border-b border-outline-variant pb-4">
                            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div>
                                <h3 className="font-headline-md text-lg font-bold text-primary">{studentName}</h3>
                                <p className="font-body-md text-sm text-on-surface-variant">Sinh viên năm 3</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="flex justify-between text-sm font-label-md mb-1">
                                    <span className="text-on-surface">Năng lượng</span>
                                    <span className="text-secondary-container">{gameState.resources.energy}%</span>
                                </div>
                                <div className="status-bar-bg">
                                    <div className="status-bar-fill-energy" style={{ width: `${gameState.resources.energy}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-label-md mb-1">
                                    <span className="text-on-surface">Tiến độ tuần</span>
                                    <span className="text-surface-tint">{weekProgress}%</span>
                                </div>
                                <div className="status-bar-bg">
                                    <div className="status-bar-fill-progress" style={{ width: `${weekProgress}%` }}></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 p-3 bg-surface rounded border border-outline-variant">
                                <div className="flex items-center gap-2 text-on-surface-variant">
                                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                                    <span className="font-label-md text-sm">Tài chính</span>
                                </div>
                                <span className="font-label-md text-sm font-bold text-primary">
                                    {gameState.resources.money.toLocaleString('vi-VN')} VNĐ
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Test Traits UI */}
                    <div className="p-4 bg-surface-container-low border border-outline-variant rounded flex flex-col gap-3">
                        <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Chỉ số Phẩm chất</h3>
                        {[
                            { key: 'can', label: 'Cần', color: '#1a73e8' },
                            { key: 'kiem', label: 'Kiệm', color: '#0d9488' },
                            { key: 'liem', label: 'Liêm', color: '#7c3aed' },
                            { key: 'chinh', label: 'Chính', color: '#d97706' },
                        ].map(({ key, label, color }) => {
                            const val = gameState.traits[key] ?? 100;
                            return (
                                <div key={key} className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-semibold text-on-surface-variant uppercase">{label}</span>
                                        <span className="text-[11px] font-bold" style={{ color }}>{val}<span className="text-on-surface-variant font-normal">/100</span></span>
                                    </div>
                                    <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${val}%`, backgroundColor: color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    {/* Story Progress */}
                    <div>
                        <h2 className="font-label-md text-label-md text-on-surface-variant mb-4 uppercase">Hành trình 5 ngày</h2>
                        <div className="flex flex-col">
                            {days.map((step, dayIdx) => {
                                const dayCompleted = finished || dayIdx < dayIndex;
                                const dayActive = !finished && dayIdx === dayIndex;
                                const milestoneIds = [dayIdx * 2 + 1, dayIdx * 2 + 2];
                                return (
                                    <div key={step.day} className="relative">
                                        <div className={`absolute left-[11px] w-[2px] bg-outline-variant ${dayIdx === 0 ? 'top-7' : 'top-0'} bottom-0`}></div>
                                        <div className="flex items-start gap-4 relative z-10">
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${dayActive || dayCompleted
                                                    ? 'bg-secondary-container border-secondary-container'
                                                    : 'bg-surface border-outline-variant'
                                                    }`}
                                            >
                                                {dayCompleted && (
                                                    <span className="material-symbols-outlined text-[12px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                                )}
                                            </div>
                                            <div className="pb-4">
                                                <p className={`font-label-md text-label-md ${dayActive ? 'text-secondary font-bold' : dayCompleted ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>{step.day}</p>
                                                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{step.title}</p>
                                            </div>
                                        </div>

                                        {/* 2 Milestones */}
                                        <div className={`ml-[18px] relative z-10 flex flex-col gap-3 ${dayIdx < days.length - 1 ? 'pb-6' : 'pb-2'}`}>
                                            {milestoneIds.map((sid, m) => {
                                                const mCompleted = finished || sid < scenario.id;
                                                const mActive = !finished && sid === scenario.id;
                                                return (
                                                    <div key={sid} className="relative">
                                                        <div
                                                            className={`absolute -left-[12px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-colors ${mActive || mCompleted
                                                                ? 'bg-secondary-container border-secondary-container'
                                                                : 'bg-surface border-outline-variant'
                                                                }`}
                                                        ></div>
                                                        <div className="pl-3">
                                                            <p className={`text-xs font-semibold ${mActive ? 'text-secondary' : mCompleted ? 'text-on-surface' : 'text-on-surface-variant'}`}>Tình huống {m + 1}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Main Scenario Area */}
                <section className="w-full md:w-3/4 flex flex-col gap-8">
                    {finished ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <span className="ethics-tag giao">Kết quả</span>
                                <span className="font-label-md text-label-md text-on-surface-variant">Hành trình 5 ngày đã hoàn thành</span>
                            </div>
                            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Tổng kết hành trình đạo đức</h1>
                            <div className="bg-[#F4F7FA] border-l-4 border-primary-fixed-dim p-8 rounded-r">
                                <div className="text-center mb-6">
                                    <span className="font-display-lg text-display-lg text-secondary-container block">{bestCount}/{scenarios.length}</span>
                                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">Lựa chọn tối ưu</span>
                                </div>
                                <div className="w-full bg-surface-variant rounded-full h-4 mb-8 overflow-hidden">
                                    <div className="bg-secondary-container h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${(bestCount / scenarios.length) * 100}%` }}></div>
                                </div>
                                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{getResultMessage(bestCount)}</p>
                            </div>
                            <div className="mt-4">
                                <button onClick={restart} className="bg-primary text-on-primary px-8 py-3 rounded font-label-md text-label-md hover:bg-primary-container transition-colors lift-hover">Làm lại hành trình</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Scenario Presentation */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className={`ethics-tag ${scenario.tag}`}>{scenario.tagLabel}</span>
                                    <span className="font-label-md text-label-md text-on-surface-variant">{scenario.timeLabel}</span>
                                    <div className="ml-auto flex items-center gap-3">
                                        <button
                                            onClick={handleOpenTutorial}
                                            className="flex items-center gap-1 text-xs font-semibold text-secondary-container hover:text-on-secondary-container bg-secondary-container/10 hover:bg-secondary-container/20 px-2.5 py-1 rounded border border-secondary-container/30 transition-all cursor-pointer"
                                            title="Xem lại hướng dẫn người chơi"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">help_outline</span>
                                            <span>Hướng dẫn</span>
                                        </button>
                                        <span className="font-label-md text-label-md text-surface-tint">Tình huống {currentIndex + 1}/{scenarios.length}</span>
                                    </div>
                                </div>
                                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">{scenario.title}</h1>
                                <div className="relative w-full h-[300px] overflow-hidden rounded mb-4 bg-surface-container-low">
                                    <img
                                        src={scenarioImages[scenario.id]}
                                        alt={scenario.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex gap-2 text-white items-center">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                                            <span className="font-label-md text-label-md">Tình huống hiện tại</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#F4F7FA] border-l-4 border-primary-fixed-dim p-6 rounded-r">
                                    <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{scenario.situation}</p>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex flex-col gap-4 mt-4">
                                <h3 className="font-headline-md text-headline-md text-primary mb-2">Bạn sẽ quyết định thế nào?</h3>
                                {scenario.options.map((opt) => {
                                    const isSelected = selected === opt.id;
                                    const isDisabled = selected !== undefined;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => selectOption(opt.id)}
                                            className={`lift-hover w-full text-left p-6 bg-surface border rounded flex gap-4 items-start group transition-colors ${isDisabled
                                                ? isSelected
                                                    ? opt.best
                                                        ? 'border-primary bg-[#F4F7FA]'
                                                        : 'border-surface-tint bg-[#F6F3F2]'
                                                    : 'opacity-50 pointer-events-none border-outline-variant'
                                                : 'border-outline-variant'
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${isSelected
                                                    ? opt.best
                                                        ? 'bg-primary text-on-primary border-primary'
                                                        : 'bg-surface-tint text-on-primary border-surface-tint'
                                                    : 'border-outline-variant group-hover:border-primary'
                                                    }`}
                                            >
                                                <span className="font-label-md text-label-md">{opt.letter}</span>
                                            </div>
                                            <div>
                                                <p className="font-body-lg text-body-lg text-on-surface font-medium">{opt.title}</p>
                                                <p className="font-body-md text-body-md text-on-surface-variant mt-2">{opt.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* AI Feedback */}
                            {selectedOption && (
                                <div ref={feedbackRef} className="mt-8 p-8 bg-surface border border-outline-variant rounded relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-surface-tint"></div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-surface-tint" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                                        <h3 className="font-headline-md text-headline-md text-primary">Phân tích từ Cố vấn</h3>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h4 className={`font-headline-md text-headline-md ${selectedOption.best ? 'text-primary' : 'text-surface-tint'}`}>{selectedOption.feedback.title}</h4>
                                        <p className="font-body-lg text-body-lg text-on-surface">{selectedOption.feedback.text}</p>
                                        <div className="mt-4 p-4 bg-surface-container border-l-4 border-outline-variant">
                                            <p className="font-body-md text-body-md text-on-surface-variant italic">{selectedOption.feedback.quote}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-outline-variant flex justify-end">
                                        <button
                                            onClick={goNext}
                                            disabled={saving}
                                            className="bg-primary text-on-primary px-8 py-3 rounded font-label-md text-label-md hover:bg-primary-container transition-colors lift-hover disabled:opacity-60 disabled:pointer-events-none"
                                        >
                                            {saving
                                                ? 'Đang lưu kết quả...'
                                                : currentIndex === scenarios.length - 1
                                                    ? 'Xem kết quả hành trình'
                                                    : 'Tiếp tục chặng kế'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>

            {/* Pop-up Tutorial Modal */}
            {showTutorial && (
                <div className={`fixed inset-0 z-[120] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md ${isClosingTutorial ? 'modal-backdrop-exit' : 'modal-backdrop-animate'}`}>
                    <div className={`bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative ${isClosingTutorial ? 'modal-content-exit' : 'modal-content-animate'}`}>
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-primary-container to-[#0b1b36] text-on-primary p-6 rounded-t-2xl relative overflow-hidden flex flex-col gap-2">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary-container text-2xl">sports_esports</span>
                                    <span className="font-label-md text-xs uppercase tracking-widest text-secondary-container font-bold">HƯỚNG DẪN THỬ THÁCH</span>
                                </div>
                                <button
                                    onClick={handleCloseTutorial}
                                    className="text-on-primary/70 hover:text-on-primary hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
                                    title="Đóng"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>
                            <h2 className="font-headline text-2xl font-bold text-white relative z-10">
                                Chào mừng <span className="text-secondary-container">{studentName}</span> đến với Thử thách!
                            </h2>
                            <p className="text-sm text-on-primary-container relative z-10 leading-relaxed">
                                Trước khi bắt đầu hành trình 5 ngày rèn luyện, hãy cùng tìm hiểu mục tiêu và lối chơi nhé.
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 flex flex-col gap-6 font-body text-on-surface">
                            {/* Section 1: Mục tiêu */}
                            <div className="flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
                                <div className="flex items-center gap-2 text-primary font-bold font-headline text-lg">
                                    <span className="material-symbols-outlined text-secondary-container">flag</span>
                                    <h3>1. Mục tiêu hành trình</h3>
                                </div>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Vận dụng linh hoạt các chuẩn mực đạo đức Hồ Chí Minh <strong className="text-primary font-semibold">Cần - Kiệm - Liêm - Chính</strong> để xử lý các tình huống thực tế trong học tập và cuộc sống sinh viên.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant text-center">
                                        <span className="block text-xs font-bold text-primary uppercase">Cần</span>
                                        <span className="text-[11px] text-on-surface-variant">Chăm chỉ, khoa học</span>
                                    </div>
                                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant text-center">
                                        <span className="block text-xs font-bold text-primary uppercase">Kiệm</span>
                                        <span className="text-[11px] text-on-surface-variant">Tiết kiệm công & tư</span>
                                    </div>
                                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant text-center">
                                        <span className="block text-xs font-bold text-primary uppercase">Liêm</span>
                                        <span className="text-[11px] text-on-surface-variant">Trong sạch, minh bạch</span>
                                    </div>
                                    <div className="bg-surface p-2.5 rounded-lg border border-outline-variant text-center">
                                        <span className="block text-xs font-bold text-primary uppercase">Chính</span>
                                        <span className="text-[11px] text-on-surface-variant">Thẳng thắn, công tâm</span>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Lối chơi */}
                            <div className="flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/60">
                                <div className="flex items-center gap-2 text-primary font-bold font-headline text-lg">
                                    <span className="material-symbols-outlined text-secondary-container">style</span>
                                    <h3>2. Lối chơi & Quy tắc</h3>
                                </div>

                                <div className="space-y-3 text-sm text-on-surface-variant">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            1
                                        </div>
                                        <div>
                                            <strong className="text-on-surface font-semibold">10 Tình huống trong 5 Ngày:</strong> Bạn sẽ đi qua các thử thách từ Thứ Hai đến Thứ Sáu đại diện cho đời sống học đường.
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            2
                                        </div>
                                        <div>
                                            <strong className="text-on-surface font-semibold">Đưa ra Lựa chọn (A, B, C):</strong> Đọc kỹ bối cảnh và chọn 1 trong 3 giải pháp xử lý. Mỗi lựa chọn đều phản ánh góc nhìn đạo đức khác nhau.
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            3
                                        </div>
                                        <div>
                                            <strong className="text-on-surface font-semibold">Tác động Chỉ số:</strong> Quyết định của bạn sẽ trực tiếp thay đổi:
                                            <ul className="list-disc list-inside mt-1 pl-1 text-xs space-y-1 text-on-surface-variant">
                                                <li><span className="font-semibold text-secondary-container">Năng lượng (%):</span> Sức khỏe & tinh thần cá nhân.</li>
                                                <li><span className="font-semibold text-surface-tint">Tiến độ tuần (%):</span> Mức độ hoàn thành mục tiêu.</li>
                                                <li><span className="font-semibold text-primary">Tài chính (VNĐ):</span> Quản lý chi tiêu sinh viên.</li>
                                                <li><span className="font-semibold text-secondary">Chỉ số Phẩm chất:</span> Tích lũy điểm Cần - Kiệm - Liêm - Chính.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                            4
                                        </div>
                                        <div>
                                            <strong className="text-on-surface font-semibold">Nhận Phân tích Cố vấn:</strong> Sau mỗi lựa chọn, xem bài học rút ra từ Cố vấn để đúc kết kinh nghiệm cho bản thân.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-surface-container-low border-t border-outline-variant/60 rounded-b-2xl flex items-center justify-between gap-4">
                            <span className="text-xs text-on-surface-variant italic hidden sm:inline-block">
                                * Có thể mở lại bất cứ lúc nào qua nút "Hướng dẫn" trên trang.
                            </span>
                            <button
                                onClick={handleCloseTutorial}
                                className="w-full sm:w-auto ml-auto bg-secondary-container hover:bg-[#e67e00] text-on-secondary-container font-headline font-bold text-base py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer lift-hover"
                            >
                                Sẵn sàng & Bắt đầu ngay
                                <span className="material-symbols-outlined text-xl">play_arrow</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Challenge;

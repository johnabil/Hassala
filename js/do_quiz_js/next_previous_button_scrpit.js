/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 function get_next_question() {
            var answer = $('input[name="optradio"]:checked').val();           
            // ------------------------------------------------------
            var course_name = $("#course_name").val();
            //last_q denotes last_question_index
            var last_q = $("#last_q").val();
            //count denotes number of questions
            var count = $("#count").val();
            var count_problems = $("#count_problems").val();

            if (last_q == count && count != "0")
                var last_p = "0";
            else
                var last_p = $("#last_p").val();
            var str = last_q + "&&" + count + "&&" + last_p + "&&" + count_problems + "&&" + course_name;
            $.post('ajax_do_quiz.php', {
                str: str
            }, function (html) {
                $("#question-form").empty();
                $("#question-form").append(html);

                if (last_q <= count) {
                    var x = parseInt(last_q);
                    $("#last_q").val(x + 1);
                }

                if (last_q >= count) {
                    var y = parseInt(last_p);
                    $("#last_p").val(y + 1);
                }
                $(".previous").attr("disabled", false);
            });
            var question_tracker = $("#question_tracker").val();
            var total_questions = $("#total_questions").val();
            var total_attempts = $("#total_attempts").val();
            var solve_data = question_tracker + "||" + total_questions + "||" + total_attempts;
            $.post('ajax_do_quiz.php', {
                solve_data: solve_data
            }, function (html2) {
                $("#question-data").empty();
                $("#question-data").append(html2);
                var y = parseInt(question_tracker);
                $("#question_tracker").val(y + 1);
                if (question_tracker == total_questions)
                    $(".next").attr("disabled", true);
            });
        }
        function get_previous_question() {
            var course_name = $("#course_name").val();
            var count = $("#count").val();
            var last_q = $("#last_q").val();
            var count_problems = $("#count_problems").val();
            var last_p = $("#last_p").val();

            if (last_q <= count) {
                var last_q_index = parseInt(last_q);
                $("#last_q").val(last_q_index - 2);
                last_q = $("#last_q").val();
            } else if (last_q > count && last_p <= 1) {
                var last_q_index = parseInt(count);
                $("#last_q").val(last_q_index - 1);
                last_q = $("#last_q").val();
            } else if (last_q > count) {
                var last_p_index = parseInt(last_p);
                $("#last_p").val(last_p_index - 2);
                last_p = $("#last_p").val();
            }
            var str = last_q + "&&" + count + "&&" + last_p + "&&" + count_problems + "&&" + course_name;
            $.post('ajax_do_quiz.php', {
                str: str
            }, function (html) {
                $("#question-form").empty();
                $("#question-form").append(html);
                if (last_q <= count) {
                    var y = parseInt(last_q);
                    $("#last_q").val(y + 1);
                }
                if (last_q > count) {
                    var last_p_index = parseInt(last_p);
                    $("#last_p").val(last_p_index + 1);
                }
            });



            //------------------------
            var question_tracker = parseInt($("#question_tracker").val()) - 2;
            var total_questions = $("#total_questions").val();
            var total_attempts = $("#total_attempts").val();
            var solve_data = question_tracker + "||" + total_questions + "||" + total_attempts;
            $.post('ajax_do_quiz.php', {
                solve_data: solve_data
            }, function (html2) {
                $("#question-data").empty();
                $("#question-data").append(html2);
                var y = parseInt(question_tracker);
                $("#question_tracker").val(y + 1);
                if (question_tracker == "1")
                    $(".previous").attr("disabled", true);
                if (question_tracker < total_questions)
                    $(".next").attr("disabled", false);
            });

        }
package com.bluepantsmedia.dev.bridgegapp.application.jdbc.src.main.java;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class JdbcApp {
    private static String db = "hris_dev";
    private static final String CONNECTION = "jdbc:sqlserver://localhost:52528;databaseName=";
    private static final String USER = "garyg";
    private static final String PASS = "garypass";

    private static final char DEFAULT_SEPARATOR = ',';
    private static final char DEFAULT_QUOTE = '"';
    private static PreparedStatement countEmps = null;
    private static PreparedStatement countJobs = null;


    public static void main(String[] args) {
        try {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
        }

        try (Connection con = DriverManager.getConnection(CONNECTION + db, USER , PASS); Statement stmt = con.createStatement();) {
            //doNames(stmt);
            doWords(stmt);
            doChars(stmt);
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("Finished");
    }

    private static void doNames(Statement stmt) {
        try (Stream<Path> paths = Files.walk(Paths.get("../../../../../../dictionaries/names/most_common_surnames.txt"))) {
            paths.filter(Files::isRegularFile)
                    .forEach(file -> {
                        System.out.println("Getting surnames from " + file.toString());
                        try {
                            Files.lines(file, Charset.forName("UTF-8")).forEach(line -> {
                                try {
                                    AtomicInteger index = new AtomicInteger();
                                    final StringBuilder sql = new StringBuilder("insert into ids_surnames values('");
                                    index.set(1);
                                    Stream.of(line.split(":"))
                                            .map(words -> (String) words)
                                            .collect(Collectors.toList()).forEach(word -> {
                                        if(word != null && word.length() > 0) {
                                            String val = word.trim().toLowerCase();
                                            int i = index.getAndIncrement();
                                            if(i == 1) {
                                                sql.append(val + "',");
                                            }
                                            else if(i == 2) {
                                                sql.append(val + ",");
                                            }
                                            else if(i == 3) {
                                                sql.append(val + ")");
                                            }
                                            else {
                                            }
                                        }
                                    });
                                    try {
                                        stmt.executeUpdate(sql.toString());
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            });
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
        try (Stream<Path> paths = Files.walk(Paths.get("../../../../../../dictionaries/names/most_common_female_first_names.txt"))) {
            paths.filter(Files::isRegularFile)
                    .forEach(file -> {
                        System.out.println("Getting female first names from " + file.toString());
                        try {
                            Files.lines(file, Charset.forName("UTF-8")).forEach(line -> {
                                try {
                                    AtomicInteger index = new AtomicInteger();
                                    final StringBuilder sql = new StringBuilder("insert into ids_female_first_names values('");
                                    final StringBuilder sql2 = new StringBuilder("");
                                    final StringBuilder sql3 = new StringBuilder("");
                                    index.set(1);
                                    Stream.of(line.split(":"))
                                            .map(words -> (String) words)
                                            .collect(Collectors.toList()).forEach(word -> {
                                        if(word != null && word.length() > 0) {
                                            String val = word.toLowerCase().trim().replaceAll(",","");
                                            int i = index.getAndIncrement();
                                            if(i == 1) {
                                                sql.append(val + "',");
                                            }
                                            else if(i == 4) {
                                                sql2.append(val + ",");
                                            }
                                            else if(i == 3) {
                                                sql3.append(val + ")");
                                            }
                                            else {
                                            }
                                        }
                                    });
                                    try {
                                        //System.out.println(sql.toString() + sql2.toString() + sql3.toString());
                                        stmt.executeUpdate(sql.toString() + sql2.toString() + sql3.toString());
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            });
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
        try (Stream<Path> paths = Files.walk(Paths.get("../../../../../../dictionaries/names/most_common_male_first_names.txt"))) {
            paths.filter(Files::isRegularFile)
                    .forEach(file -> {
                        System.out.println("Getting female first names from " + file.toString());
                        try {
                            Files.lines(file, Charset.forName("UTF-8")).forEach(line -> {
                                try {
                                    AtomicInteger index = new AtomicInteger();
                                    final StringBuilder sql = new StringBuilder("insert into ids_male_first_names values('");
                                    final StringBuilder sql2 = new StringBuilder("");
                                    final StringBuilder sql3 = new StringBuilder("");
                                    index.set(1);
                                    Stream.of(line.split(":"))
                                            .map(words -> (String) words)
                                            .collect(Collectors.toList()).forEach(word -> {
                                        if(word != null && word.length() > 0) {
                                            String val = word.toLowerCase().trim().replaceAll(",","");
                                            int i = index.getAndIncrement();
                                            if(i == 1) {
                                                sql.append(val + "',");
                                            }
                                            else if(i == 4) {
                                                sql2.append(val + ",");
                                            }
                                            else if(i == 3) {
                                                sql3.append(val + ")");
                                            }
                                            else {
                                            }
                                        }
                                    });
                                    try {
                                        //System.out.println(sql.toString() + sql2.toString() + sql3.toString());
                                        stmt.executeUpdate(sql.toString() + sql2.toString() + sql3.toString());
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            });
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    private static void doChars(Statement stmt) {
        try (Stream<Path> paths = Files.walk(Paths.get("../../../../../../dictionaries"))) {
            paths.filter(Files::isRegularFile)
                    .forEach(file -> {
                        System.out.println("Getting chars from " + file.toString());
                        try {
                            Files.lines(file, Charset.forName("UTF-8")).forEach(line -> {
                                try {
                                    line.chars()
                                            .mapToObj(item -> (char) item)
                                            .collect(Collectors.toList()).forEach(ch -> {
                                                String sql = "insert into ids_char_table values('" + new String(Character.toLowerCase(ch) + "").replace("'","''") + "')";
                                                try {
                                                    stmt.executeUpdate(sql);
                                                } catch (Exception e) {
                                                    e.printStackTrace();
                                                }
                                    });
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            });
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void doWords(Statement stmt) {
        try (Stream<Path> paths = Files.walk(Paths.get("../../../../../../dictionaries"))) {
            paths.filter(Files::isRegularFile)
                    .forEach(file -> {
                        System.out.println("Getting words from " + file.toString());
                        try {
                            Files.lines(file).forEach(line -> {
                                try {
                                    Stream.of(line.split(" "))
                                            .map(words -> (String) words)
                                            .collect(Collectors.toList()).forEach(word -> {
                                                if(word != null && word.length() > 0) {
                                                    try {
                                                        String val = word.trim();
                                                        val = val.replaceAll("\"","");
                                                        val = val.replaceAll("'s","");
                                                        val = val.replaceAll("'","");
                                                        if(val.length() > 2) {
                                                            for (int i = 0; i < 3; i++) {
                                                                if (val.substring(0, 1).equals("'")) {
                                                                    val = val.substring(1, val.length());
                                                                }
                                                                if (val.substring(val.length() - 1).equals("'")) {
                                                                    val = val.substring(0, val.length() - 1);
                                                                }
                                                                if (val.substring(0, 1).equals("-")) {
                                                                    val = val.substring(1, val.length());
                                                                }
                                                                if (val.substring(val.length() - 1).equals("-")) {
                                                                    val = val.substring(0, val.length() - 1);
                                                                }
                                                            }
                                                        }
                                                        if(!val.equals("'")) {
                                                            String sql = "insert into ids_word_table values('" + val.toLowerCase().replaceAll("[.,!?;:()]", "").replace("'", "''") + "')";
                                                            try {
                                                                stmt.executeUpdate(sql);
                                                            } catch (Exception e) {
                                                                e.printStackTrace();
                                                            }
                                                        }
                                                    } catch (Exception e) {
                                                        e.printStackTrace();
                                                    }
                                                }
                                    });
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            });
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private final static String convertToBinary(String input, String encoding)
            throws UnsupportedEncodingException {
        byte[] encoded_input = stringToByteArray(input, encoding);
        return IntStream.range(0, encoded_input.length)
                .map(i -> encoded_input[i])
                .mapToObj(e -> Integer.toBinaryString(e ^ 255))
                .map(e -> String.format("%1$" + Byte.SIZE + "s", e).replace(" ", "0"))
                .collect(Collectors.joining(" "));
    }

    private static byte[] stringToByteArray(String input, String encoding) {
        return Charset.forName(encoding)
                    .encode(input)
                    .array();
    }
}
